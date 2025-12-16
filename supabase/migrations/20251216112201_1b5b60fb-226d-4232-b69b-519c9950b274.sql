-- Create content_collections table
CREATE TABLE public.content_collections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN NOT NULL DEFAULT false,
  cover_image_url TEXT,
  item_count INTEGER NOT NULL DEFAULT 0,
  follower_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create content_collection_items table
CREATE TABLE public.content_collection_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  collection_id UUID NOT NULL REFERENCES public.content_collections(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL,
  content_id TEXT NOT NULL,
  title TEXT,
  notes TEXT,
  position INTEGER NOT NULL DEFAULT 0,
  added_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.content_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_collection_items ENABLE ROW LEVEL SECURITY;

-- RLS policies for content_collections
CREATE POLICY "Public collections are viewable by everyone"
ON public.content_collections FOR SELECT
USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can create own collections"
ON public.content_collections FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own collections"
ON public.content_collections FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own collections"
ON public.content_collections FOR DELETE
USING (auth.uid() = user_id);

-- RLS policies for content_collection_items
CREATE POLICY "Collection items viewable if collection is viewable"
ON public.content_collection_items FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.content_collections c
  WHERE c.id = content_collection_items.collection_id
  AND (c.is_public = true OR c.user_id = auth.uid())
));

CREATE POLICY "Users can add items to own collections"
ON public.content_collection_items FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM public.content_collections c
  WHERE c.id = content_collection_items.collection_id
  AND c.user_id = auth.uid()
));

CREATE POLICY "Users can update items in own collections"
ON public.content_collection_items FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM public.content_collections c
  WHERE c.id = content_collection_items.collection_id
  AND c.user_id = auth.uid()
));

CREATE POLICY "Users can delete items from own collections"
ON public.content_collection_items FOR DELETE
USING (EXISTS (
  SELECT 1 FROM public.content_collections c
  WHERE c.id = content_collection_items.collection_id
  AND c.user_id = auth.uid()
));

-- Create indexes
CREATE INDEX idx_content_collections_user_id ON public.content_collections(user_id);
CREATE INDEX idx_content_collections_is_public ON public.content_collections(is_public);
CREATE INDEX idx_content_collection_items_collection_id ON public.content_collection_items(collection_id);

-- Add trigger for updated_at
CREATE TRIGGER update_content_collections_updated_at
BEFORE UPDATE ON public.content_collections
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();