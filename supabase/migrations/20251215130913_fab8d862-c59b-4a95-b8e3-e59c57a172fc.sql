-- Create function to update user stats when a discussion is created
CREATE OR REPLACE FUNCTION public.update_user_stats_on_discussion_insert()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.user_id IS NOT NULL THEN
    UPDATE public.profiles 
    SET posts_count = COALESCE(posts_count, 0) + 1,
        reputation_score = COALESCE(reputation_score, 0) + 5
    WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create function to update user stats when a reply is created
CREATE OR REPLACE FUNCTION public.update_user_stats_on_reply_insert()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.user_id IS NOT NULL THEN
    UPDATE public.profiles 
    SET reputation_score = COALESCE(reputation_score, 0) + 2
    WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for discussions
CREATE TRIGGER on_discussion_created
  AFTER INSERT ON public.forum_discussions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_user_stats_on_discussion_insert();

-- Create trigger for replies
CREATE TRIGGER on_reply_created
  AFTER INSERT ON public.forum_replies
  FOR EACH ROW
  EXECUTE FUNCTION public.update_user_stats_on_reply_insert();