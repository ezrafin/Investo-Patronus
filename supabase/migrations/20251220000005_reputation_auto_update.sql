-- Fix Reputation Auto-Update Trigger
-- Updates reputation_score based on reactions and ensures consistency

-- Fix the update_user_reputation function to use reputation_score
CREATE OR REPLACE FUNCTION update_user_reputation()
RETURNS TRIGGER AS $$
DECLARE
    content_user_id uuid;
    reputation_change integer;
BEGIN
    -- Determine the user who owns the content
    IF NEW.content_type = 'discussion' THEN
        SELECT user_id INTO content_user_id
        FROM public.forum_discussions
        WHERE id = NEW.content_id;
    ELSIF NEW.content_type = 'reply' THEN
        SELECT user_id INTO content_user_id
        FROM public.forum_replies
        WHERE id = NEW.content_id;
    END IF;

    -- Calculate reputation change based on reaction type
    CASE NEW.reaction_type
        WHEN 'like' THEN reputation_change := 1;
        WHEN 'helpful' THEN reputation_change := 2;
        WHEN 'insightful' THEN reputation_change := 3;
        WHEN 'agree' THEN reputation_change := 1;
        ELSE reputation_change := 0;
    END CASE;

    -- Update reputation_score if content owner exists
    IF content_user_id IS NOT NULL AND reputation_change > 0 THEN
        UPDATE public.profiles
        SET reputation_score = COALESCE(reputation_score, 0) + reputation_change,
            updated_at = now()
        WHERE id = content_user_id;

        -- Log reputation change
        INSERT INTO public.reputation_history (user_id, change_amount, reason, source_type, source_id)
        VALUES (content_user_id, reputation_change, 'Reaction: ' || NEW.reaction_type, NEW.content_type, NEW.content_id);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fix the remove_user_reputation function to use reputation_score
CREATE OR REPLACE FUNCTION remove_user_reputation()
RETURNS TRIGGER AS $$
DECLARE
    content_user_id uuid;
    reputation_change integer;
BEGIN
    -- Determine the user who owns the content
    IF OLD.content_type = 'discussion' THEN
        SELECT user_id INTO content_user_id
        FROM public.forum_discussions
        WHERE id = OLD.content_id;
    ELSIF OLD.content_type = 'reply' THEN
        SELECT user_id INTO content_user_id
        FROM public.forum_replies
        WHERE id = OLD.content_id;
    END IF;

    -- Calculate reputation change (negative)
    CASE OLD.reaction_type
        WHEN 'like' THEN reputation_change := -1;
        WHEN 'helpful' THEN reputation_change := -2;
        WHEN 'insightful' THEN reputation_change := -3;
        WHEN 'agree' THEN reputation_change := -1;
        ELSE reputation_change := 0;
    END CASE;

    -- Update reputation_score if content owner exists
    IF content_user_id IS NOT NULL AND reputation_change < 0 THEN
        UPDATE public.profiles
        SET reputation_score = GREATEST(0, COALESCE(reputation_score, 0) + reputation_change),
            updated_at = now()
        WHERE id = content_user_id;
    END IF;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure triggers exist
DROP TRIGGER IF EXISTS trigger_update_reputation_on_reaction ON public.forum_reactions;
CREATE TRIGGER trigger_update_reputation_on_reaction
    AFTER INSERT ON public.forum_reactions
    FOR EACH ROW
    EXECUTE FUNCTION update_user_reputation();

DROP TRIGGER IF EXISTS trigger_remove_reputation_on_reaction_delete ON public.forum_reactions;
CREATE TRIGGER trigger_remove_reputation_on_reaction_delete
    AFTER DELETE ON public.forum_reactions
    FOR EACH ROW
    EXECUTE FUNCTION remove_user_reputation();

