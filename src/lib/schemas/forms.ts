import { z } from 'zod';

export const CreateDiscussionSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters'),
  content: z.string().min(50, 'Content should be at least 50 characters'),
  category: z.string(),
  tags: z.string().optional(),
  symbol: z.string().optional(),
  asset_type: z
    .enum(['stock', 'crypto', 'index', 'commodity', 'currency', 'etf'])
    .optional(),
});

export const ReplySchema = z.object({
  content: z.string().min(5, 'Reply should be at least 5 characters'),
});

export type CreateDiscussionInput = z.infer<typeof CreateDiscussionSchema>;
export type ReplyInput = z.infer<typeof ReplySchema>;


