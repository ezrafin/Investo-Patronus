-- Moderation Integration Migration
-- Connect moderation system with forum reports and hidden flags

-- Add reported and hidden columns to forum_discussions if they don't exist
ALTER TABLE public.forum_discussions
ADD COLUMN IF NOT EXISTS reported boolean DEFAULT false NOT NULL,
ADD COLUMN IF NOT EXISTS hidden boolean DEFAULT false NOT NULL;

-- Add reported and hidden columns to forum_replies if they don't exist
ALTER TABLE public.forum_replies
ADD COLUMN IF NOT EXISTS reported boolean DEFAULT false NOT NULL,
ADD COLUMN IF NOT EXISTS hidden boolean DEFAULT false NOT NULL;

-- Index for filtering hidden content
CREATE INDEX IF NOT EXISTS idx_forum_discussions_hidden 
ON public.forum_discussions (hidden) 
WHERE hidden = false;

CREATE INDEX IF NOT EXISTS idx_forum_replies_hidden 
ON public.forum_replies (hidden) 
WHERE hidden = false;

-- Function to auto-hide content when it reaches a threshold of reports
CREATE OR REPLACE FUNCTION auto_hide_reported_content()
RETURNS TRIGGER AS $$
DECLARE
    report_count integer;
    hide_threshold integer := 3; -- Hide after 3 reports
BEGIN
    -- Count pending reports for this content
    SELECT COUNT(*) INTO report_count
    FROM public.forum_reports
    WHERE 
        content_type = NEW.content_type
        AND content_id = NEW.content_id
        AND status = 'pending';

    -- Auto-hide if threshold reached
    IF report_count >= hide_threshold THEN
        IF NEW.content_type = 'discussion' THEN
            UPDATE public.forum_discussions
            SET hidden = true, reported = true
            WHERE id = NEW.content_id::uuid;
        ELSIF NEW.content_type = 'reply' THEN
            UPDATE public.forum_replies
            SET hidden = true, reported = true
            WHERE id = NEW.content_id::uuid;
        END IF;
    ELSE
        -- Mark as reported but not hidden yet
        IF NEW.content_type = 'discussion' THEN
            UPDATE public.forum_discussions
            SET reported = true
            WHERE id = NEW.content_id::uuid;
        ELSIF NEW.content_type = 'reply' THEN
            UPDATE public.forum_replies
            SET reported = true
            WHERE id = NEW.content_id::uuid;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-hide on report
DROP TRIGGER IF EXISTS trigger_auto_hide_on_report ON public.forum_reports;
CREATE TRIGGER trigger_auto_hide_on_report
    AFTER INSERT ON public.forum_reports
    FOR EACH ROW
    EXECUTE FUNCTION auto_hide_reported_content();

-- Function to update reported flag when report is resolved
CREATE OR REPLACE FUNCTION update_reported_flag_on_resolve()
RETURNS TRIGGER AS $$
BEGIN
    -- If report is resolved or dismissed, we don't change the reported flag
    -- (it stays true for historical purposes)
    -- But if moderator explicitly unhides, we can clear the flag
    
    IF NEW.status IN ('resolved', 'dismissed') AND OLD.status = 'pending' THEN
        -- Moderator reviewed and resolved - content can be unhidden if needed
        -- This would be done manually by moderator, not automatically
        NULL;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to handle report resolution
DROP TRIGGER IF EXISTS trigger_update_flag_on_resolve ON public.forum_reports;
CREATE TRIGGER trigger_update_flag_on_resolve
    AFTER UPDATE ON public.forum_reports
    FOR EACH ROW
    WHEN (OLD.status IS DISTINCT FROM NEW.status)
    EXECUTE FUNCTION update_reported_flag_on_resolve();

