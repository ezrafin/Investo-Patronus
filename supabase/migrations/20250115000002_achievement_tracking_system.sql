-- Achievement Tracking System
-- Automatically check and unlock achievements based on user actions

-- Function to check and unlock achievements
CREATE OR REPLACE FUNCTION check_and_unlock_achievement(
  p_user_id uuid,
  p_achievement_id text
)
RETURNS void AS $$
BEGIN
  -- Check if achievement is already unlocked
  IF NOT EXISTS (
    SELECT 1 FROM public.user_achievements
    WHERE user_id = p_user_id AND achievement_id = p_achievement_id
  ) THEN
    -- Unlock the achievement
    INSERT INTO public.user_achievements (user_id, achievement_id)
    VALUES (p_user_id, p_achievement_id)
    ON CONFLICT (user_id, achievement_id) DO NOTHING;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check achievements after forum post creation
CREATE OR REPLACE FUNCTION check_achievements_on_post()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.user_id IS NOT NULL THEN
    -- Check first_post achievement
    IF NOT EXISTS (
      SELECT 1 FROM public.user_achievements
      WHERE user_id = NEW.user_id AND achievement_id = 'first_post'
    ) THEN
      PERFORM check_and_unlock_achievement(NEW.user_id, 'first_post');
    END IF;

    -- Check top_contributor achievement (100 posts or replies)
    DECLARE
      total_posts integer;
    BEGIN
      SELECT COUNT(*) INTO total_posts
      FROM (
        SELECT id FROM public.forum_discussions WHERE user_id = NEW.user_id
        UNION ALL
        SELECT id FROM public.forum_replies WHERE user_id = NEW.user_id
      ) AS combined;

      IF total_posts >= 100 THEN
        PERFORM check_and_unlock_achievement(NEW.user_id, 'top_contributor');
      END IF;
    END;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check achievements after forum reply creation
CREATE OR REPLACE FUNCTION check_achievements_on_reply()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.user_id IS NOT NULL THEN
    -- Check first_reply achievement
    IF NOT EXISTS (
      SELECT 1 FROM public.user_achievements
      WHERE user_id = NEW.user_id AND achievement_id = 'first_reply'
    ) THEN
      PERFORM check_and_unlock_achievement(NEW.user_id, 'first_reply');
    END IF;

    -- Check top_contributor achievement (100 posts or replies)
    DECLARE
      total_posts integer;
    BEGIN
      SELECT COUNT(*) INTO total_posts
      FROM (
        SELECT id FROM public.forum_discussions WHERE user_id = NEW.user_id
        UNION ALL
        SELECT id FROM public.forum_replies WHERE user_id = NEW.user_id
      ) AS combined;

      IF total_posts >= 100 THEN
        PERFORM check_and_unlock_achievement(NEW.user_id, 'top_contributor');
      END IF;
    END;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check achievements after reaction received
CREATE OR REPLACE FUNCTION check_achievements_on_reaction()
RETURNS TRIGGER AS $$
DECLARE
  content_user_id uuid;
  helpful_count integer;
  insightful_count integer;
  like_count integer;
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

  IF content_user_id IS NOT NULL THEN
    -- Count helpful reactions
    SELECT COUNT(*) INTO helpful_count
    FROM public.forum_reactions
    WHERE content_type = NEW.content_type
      AND content_id IN (
        SELECT id FROM public.forum_discussions WHERE user_id = content_user_id
        UNION ALL
        SELECT id FROM public.forum_replies WHERE user_id = content_user_id
      )
      AND reaction_type = 'helpful';

    IF helpful_count >= 10 THEN
      PERFORM check_and_unlock_achievement(content_user_id, 'helpful_answer');
    END IF;

    -- Count insightful reactions
    SELECT COUNT(*) INTO insightful_count
    FROM public.forum_reactions
    WHERE content_type = NEW.content_type
      AND content_id IN (
        SELECT id FROM public.forum_discussions WHERE user_id = content_user_id
        UNION ALL
        SELECT id FROM public.forum_replies WHERE user_id = content_user_id
      )
      AND reaction_type = 'insightful';

    IF insightful_count >= 10 THEN
      PERFORM check_and_unlock_achievement(content_user_id, 'insightful_post');
    END IF;

    -- Count likes
    SELECT COUNT(*) INTO like_count
    FROM public.forum_reactions
    WHERE content_type IN ('discussion', 'reply')
      AND content_id IN (
        SELECT id FROM public.forum_discussions WHERE user_id = content_user_id
        UNION ALL
        SELECT id FROM public.forum_replies WHERE user_id = content_user_id
      )
      AND reaction_type = 'like';

    IF like_count >= 100 THEN
      PERFORM check_and_unlock_achievement(content_user_id, 'hundred_likes');
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check reputation-based achievements
CREATE OR REPLACE FUNCTION check_achievements_on_reputation_update()
RETURNS TRIGGER AS $$
BEGIN
  -- Check expert_analyst achievement (500 reputation)
  IF NEW.reputation >= 500 AND OLD.reputation < 500 THEN
    PERFORM check_and_unlock_achievement(NEW.id, 'expert_analyst');
  END IF;

  -- Check guru achievement (1000 reputation)
  IF NEW.reputation >= 1000 AND OLD.reputation < 1000 THEN
    PERFORM check_and_unlock_achievement(NEW.id, 'guru');
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers
DROP TRIGGER IF EXISTS trigger_check_achievements_on_post ON public.forum_discussions;
CREATE TRIGGER trigger_check_achievements_on_post
  AFTER INSERT ON public.forum_discussions
  FOR EACH ROW
  WHEN (NEW.user_id IS NOT NULL)
  EXECUTE FUNCTION check_achievements_on_post();

DROP TRIGGER IF EXISTS trigger_check_achievements_on_reply ON public.forum_replies;
CREATE TRIGGER trigger_check_achievements_on_reply
  AFTER INSERT ON public.forum_replies
  FOR EACH ROW
  WHEN (NEW.user_id IS NOT NULL)
  EXECUTE FUNCTION check_achievements_on_reply();

DROP TRIGGER IF EXISTS trigger_check_achievements_on_reaction ON public.forum_reactions;
CREATE TRIGGER trigger_check_achievements_on_reaction
  AFTER INSERT ON public.forum_reactions
  FOR EACH ROW
  EXECUTE FUNCTION check_achievements_on_reaction();

DROP TRIGGER IF EXISTS trigger_check_achievements_on_reputation ON public.user_profiles;
CREATE TRIGGER trigger_check_achievements_on_reputation
  AFTER UPDATE OF reputation ON public.user_profiles
  FOR EACH ROW
  WHEN (NEW.reputation > OLD.reputation)
  EXECUTE FUNCTION check_achievements_on_reputation_update();

