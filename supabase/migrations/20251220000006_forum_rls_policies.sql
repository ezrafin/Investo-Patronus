-- Forum RLS Policies Migration
-- Ensures proper Row Level Security for all forum tables

-- Enable RLS on forum tables (if not already enabled)
ALTER TABLE public.forum_discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_follows ENABLE ROW LEVEL SECURITY;

-- Forum Discussions Policies
-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Forum discussions are publicly readable" ON public.forum_discussions;
DROP POLICY IF EXISTS "Users can create own discussions" ON public.forum_discussions;
DROP POLICY IF EXISTS "Users can update own discussions" ON public.forum_discussions;
DROP POLICY IF EXISTS "Users can delete own discussions" ON public.forum_discussions;

-- Create policies for forum_discussions
CREATE POLICY "Forum discussions are publicly readable" ON public.forum_discussions
    FOR SELECT USING (true);

CREATE POLICY "Users can create own discussions" ON public.forum_discussions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own discussions" ON public.forum_discussions
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own discussions" ON public.forum_discussions
    FOR DELETE USING (auth.uid() = user_id);

-- Forum Replies Policies
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Forum replies are publicly readable" ON public.forum_replies;
DROP POLICY IF EXISTS "Users can create own replies" ON public.forum_replies;
DROP POLICY IF EXISTS "Users can update own replies" ON public.forum_replies;
DROP POLICY IF EXISTS "Users can delete own replies" ON public.forum_replies;

-- Create policies for forum_replies
CREATE POLICY "Forum replies are publicly readable" ON public.forum_replies
    FOR SELECT USING (true);

CREATE POLICY "Users can create own replies" ON public.forum_replies
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own replies" ON public.forum_replies
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own replies" ON public.forum_replies
    FOR DELETE USING (auth.uid() = user_id);

-- Forum Follows Policies (verify existing)
DROP POLICY IF EXISTS "Users can view own follows" ON public.forum_follows;
DROP POLICY IF EXISTS "Users can manage own follows" ON public.forum_follows;

CREATE POLICY "Users can view own follows" ON public.forum_follows
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can manage own follows" ON public.forum_follows
    FOR ALL USING (user_id = auth.uid());

-- User Bookmarks Policies (verify existing)
DROP POLICY IF EXISTS "Users can view own bookmarks" ON public.user_bookmarks;
DROP POLICY IF EXISTS "Users can create own bookmarks" ON public.user_bookmarks;
DROP POLICY IF EXISTS "Users can delete own bookmarks" ON public.user_bookmarks;
DROP POLICY IF EXISTS "Users can manage own bookmarks" ON public.user_bookmarks;

CREATE POLICY "Users can view own bookmarks" ON public.user_bookmarks
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create own bookmarks" ON public.user_bookmarks
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own bookmarks" ON public.user_bookmarks
    FOR DELETE USING (user_id = auth.uid());

