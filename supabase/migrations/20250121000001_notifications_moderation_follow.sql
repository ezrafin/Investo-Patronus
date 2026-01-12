-- Notifications Moderation and Follow Migration
-- Extends notifications system with moderation and follow notifications

-- Drop and recreate the constraint to add new notification types
ALTER TABLE public.notifications
DROP CONSTRAINT IF EXISTS notifications_type_check;

ALTER TABLE public.notifications
ADD CONSTRAINT notifications_type_check CHECK (
  type = ANY (ARRAY[
    'reply_to_discussion'::text,
    'reaction_to_post'::text,
    'reaction_to_reply'::text,
    'new_follower'::text,
    'mention'::text,
    'moderation_discussion_approved'::text,
    'moderation_discussion_rejected'::text,
    'moderation_reply_approved'::text,
    'moderation_reply_rejected'::text,
    'new_comment_on_discussion'::text
  ])
);

-- Function to send moderation notification for discussions
CREATE OR REPLACE FUNCTION public.send_moderation_discussion_notification()
RETURNS TRIGGER AS $$
DECLARE
  discussion_author_id UUID;
  discussion_title TEXT;
  author_name TEXT;
BEGIN
  -- Only send notification if status changed from pending to approved/rejected
  IF OLD.status = 'pending' AND NEW.status IN ('approved', 'rejected') THEN
    -- Get discussion author
    discussion_author_id := NEW.user_id;
    discussion_title := NEW.title;
    
    -- Get author name
    SELECT COALESCE(display_name, username, 'User') INTO author_name
    FROM public.profiles
    WHERE id = discussion_author_id;
    
    -- Don't notify if author is null
    IF discussion_author_id IS NULL THEN
      RETURN NEW;
    END IF;
    
    -- Store notification in database
    INSERT INTO public.notifications (
      user_id,
      type,
      title,
      body,
      url,
      data
    ) VALUES (
      discussion_author_id,
      CASE 
        WHEN NEW.status = 'approved' THEN 'moderation_discussion_approved'
        WHEN NEW.status = 'rejected' THEN 'moderation_discussion_rejected'
      END,
      CASE 
        WHEN NEW.status = 'approved' THEN 'Your discussion was approved'
        WHEN NEW.status = 'rejected' THEN 'Your discussion was rejected'
      END,
      CASE 
        WHEN NEW.status = 'approved' THEN 'Your discussion "' || COALESCE(discussion_title, 'Untitled') || '" has been approved and is now visible to everyone.'
        WHEN NEW.status = 'rejected' THEN 'Your discussion "' || COALESCE(discussion_title, 'Untitled') || '" was rejected and has been removed.'
      END,
      CASE 
        WHEN NEW.status = 'approved' THEN '/forum/' || NEW.id::text
        ELSE NULL
      END,
      jsonb_build_object(
        'discussion_id', NEW.id,
        'discussion_title', discussion_title,
        'status', NEW.status
      )
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Function to send moderation notification for replies
CREATE OR REPLACE FUNCTION public.send_moderation_reply_notification()
RETURNS TRIGGER AS $$
DECLARE
  reply_author_id UUID;
  reply_content_preview TEXT;
  discussion_id UUID;
  author_name TEXT;
BEGIN
  -- Only send notification if is_approved changed from false/null to true, or from true to false (rejected)
  -- We'll consider false as rejected if it was previously true
  IF (OLD.is_approved IS DISTINCT FROM NEW.is_approved) THEN
    reply_author_id := NEW.user_id;
    discussion_id := NEW.discussion_id;
    reply_content_preview := LEFT(NEW.content, 100);
    
    -- Get author name
    SELECT COALESCE(display_name, username, 'User') INTO author_name
    FROM public.profiles
    WHERE id = reply_author_id;
    
    -- Don't notify if author is null
    IF reply_author_id IS NULL THEN
      RETURN NEW;
    END IF;
    
    -- Store notification in database
    IF NEW.is_approved = true AND (OLD.is_approved = false OR OLD.is_approved IS NULL) THEN
      -- Approved
      INSERT INTO public.notifications (
        user_id,
        type,
        title,
        body,
        url,
        data
      ) VALUES (
        reply_author_id,
        'moderation_reply_approved',
        'Your comment was approved',
        'Your comment has been approved and is now visible.',
        '/forum/' || discussion_id::text,
        jsonb_build_object(
          'reply_id', NEW.id,
          'discussion_id', discussion_id,
          'content_preview', reply_content_preview
        )
      );
    ELSIF NEW.is_approved = false AND OLD.is_approved = true THEN
      -- Rejected (was approved, now rejected)
      INSERT INTO public.notifications (
        user_id,
        type,
        title,
        body,
        url,
        data
      ) VALUES (
        reply_author_id,
        'moderation_reply_rejected',
        'Your comment was rejected',
        'Your comment was rejected and has been removed.',
        NULL,
        jsonb_build_object(
          'reply_id', NEW.id,
          'discussion_id', discussion_id,
          'content_preview', reply_content_preview
        )
      );
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Function to send follow notification
CREATE OR REPLACE FUNCTION public.send_follow_notification()
RETURNS TRIGGER AS $$
DECLARE
  follower_name TEXT;
  follower_profile_id UUID;
BEGIN
  -- Get follower name
  SELECT COALESCE(display_name, username, 'Someone'), id INTO follower_name, follower_profile_id
  FROM public.profiles
  WHERE id = NEW.follower_id;
  
  -- Don't notify if follower is null
  IF follower_profile_id IS NULL THEN
    RETURN NEW;
  END IF;
  
  -- Store notification in database
  INSERT INTO public.notifications (
    user_id,
    type,
    title,
    body,
    url,
    data
  ) VALUES (
    NEW.following_id,
    'new_follower',
    'New follower',
    follower_name || ' started following you',
    '/users/' || NEW.follower_id::text,
    jsonb_build_object(
      'follower_id', NEW.follower_id,
      'follower_name', follower_name
    )
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create triggers for moderation notifications
DROP TRIGGER IF EXISTS on_discussion_moderation_notification ON public.forum_discussions;
CREATE TRIGGER on_discussion_moderation_notification
  AFTER UPDATE OF status ON public.forum_discussions
  FOR EACH ROW
  WHEN (OLD.status IS DISTINCT FROM NEW.status)
  EXECUTE FUNCTION public.send_moderation_discussion_notification();

DROP TRIGGER IF EXISTS on_reply_moderation_notification ON public.forum_replies;
CREATE TRIGGER on_reply_moderation_notification
  AFTER UPDATE OF is_approved ON public.forum_replies
  FOR EACH ROW
  WHEN (OLD.is_approved IS DISTINCT FROM NEW.is_approved)
  EXECUTE FUNCTION public.send_moderation_reply_notification();

-- Create trigger for follow notifications
DROP TRIGGER IF EXISTS on_follow_notification ON public.user_follows;
CREATE TRIGGER on_follow_notification
  AFTER INSERT ON public.user_follows
  FOR EACH ROW
  EXECUTE FUNCTION public.send_follow_notification();

-- Update send_reply_notification to use new_comment_on_discussion type
CREATE OR REPLACE FUNCTION public.send_reply_notification()
RETURNS TRIGGER AS $$
DECLARE
  discussion_owner_id UUID;
  discussion_title TEXT;
  reply_author_name TEXT;
  user_email_pref BOOLEAN;
  user_push_pref BOOLEAN;
BEGIN
  -- Get discussion owner and title
  SELECT user_id, title INTO discussion_owner_id, discussion_title
  FROM public.forum_discussions
  WHERE id = NEW.discussion_id;

  -- Skip if discussion owner is the same as reply author (no self-notification)
  IF discussion_owner_id IS NULL OR discussion_owner_id = NEW.user_id THEN
    RETURN NEW;
  END IF;

  -- Get reply author name
  SELECT COALESCE(display_name, username, 'Someone') INTO reply_author_name
  FROM public.profiles
  WHERE id = NEW.user_id;

  -- Get user notification preferences
  SELECT email_notifications, push_notifications INTO user_email_pref, user_push_pref
  FROM public.profiles
  WHERE id = discussion_owner_id;

  -- Store notification in database
  INSERT INTO public.notifications (
    user_id,
    type,
    title,
    body,
    url,
    data
  ) VALUES (
    discussion_owner_id,
    'new_comment_on_discussion',
    'New comment on your discussion',
    reply_author_name || ' commented on "' || COALESCE(discussion_title, 'your discussion') || '"',
    '/forum/' || NEW.discussion_id::text,
    jsonb_build_object(
      'discussion_id', NEW.discussion_id,
      'reply_id', NEW.id,
      'author_id', NEW.user_id,
      'author_name', reply_author_name,
      'discussion_title', discussion_title
    )
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

