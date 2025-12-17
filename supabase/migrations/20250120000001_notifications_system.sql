-- Notifications System Migration
-- Adds notification preferences to profiles and creates notification system

-- Add notification preferences to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS email_notifications BOOLEAN DEFAULT false NOT NULL,
ADD COLUMN IF NOT EXISTS push_notifications BOOLEAN DEFAULT false NOT NULL;

-- Create notifications table for storing notification history
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  url TEXT,
  data JSONB DEFAULT '{}'::jsonb,
  read BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  CONSTRAINT notifications_type_check CHECK (
    type = ANY (ARRAY[
      'reply_to_discussion'::text,
      'reaction_to_post'::text,
      'reaction_to_reply'::text,
      'new_follower'::text,
      'mention'::text
    ])
  )
);

-- Enable RLS on notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for notifications
CREATE POLICY "Users can view own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON public.notifications(user_id, read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(created_at DESC);

-- Function to send notification when reply is created
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
    'reply_to_discussion',
    'New reply to your discussion',
    reply_author_name || ' replied to "' || COALESCE(discussion_title, 'your discussion') || '"',
    '/forum/' || NEW.discussion_id::text,
    jsonb_build_object(
      'discussion_id', NEW.discussion_id,
      'reply_id', NEW.id,
      'author_id', NEW.user_id,
      'author_name', reply_author_name
    )
  );

  -- Call edge function to send email/push notifications
  -- This will be handled by the edge function via HTTP call from trigger
  -- For now, we just store the notification
  -- The edge function can be called via pg_net extension or webhook

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for reply notifications
DROP TRIGGER IF EXISTS on_reply_notification ON public.forum_replies;
CREATE TRIGGER on_reply_notification
  AFTER INSERT ON public.forum_replies
  FOR EACH ROW
  EXECUTE FUNCTION public.send_reply_notification();

-- Update handle_new_user function to set default notification preferences to false
-- This will update existing function to include notification preferences
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url, email_notifications, push_notifications)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', NEW.email),
    NEW.raw_user_meta_data ->> 'avatar_url',
    false, -- email_notifications default to false
    false  -- push_notifications default to false
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

