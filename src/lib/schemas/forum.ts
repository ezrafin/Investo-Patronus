import { z } from 'zod';

export const ForumTopicSchema = z.object({
  id: z.string(),
  categoryId: z.string(),
  title: z.string(),
  content: z.string().optional(),
  author: z.string(),
  authorId: z.string().optional(),
  authorAvatar: z.string(),
  date: z.string(),
  replies: z.number(),
  views: z.number(),
  lastActivity: z.string(),
  like_count: z.number().optional(),
  authorReputation: z.number().optional(),
  symbol: z.string().optional(),
  asset_type: z
    .enum(['stock', 'crypto', 'index', 'commodity', 'currency', 'etf'])
    .optional(),
});

export const ForumCommentSchema = z.object({
  id: z.string(),
  topicId: z.string(),
  author: z.string(),
  authorId: z.string().optional(),
  authorAvatar: z.string(),
  content: z.string(),
  date: z.string(),
  rating: z.number(),
  authorReputation: z.number().optional(),
});

export const ForumCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  topicCount: z.number(),
  postCount: z.number(),
});

export type ForumTopicDTO = z.infer<typeof ForumTopicSchema>;
export type ForumCommentDTO = z.infer<typeof ForumCommentSchema>;
export type ForumCategoryDTO = z.infer<typeof ForumCategorySchema>;


