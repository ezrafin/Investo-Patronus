

# Generate New Forum Discussions + Diversify Avatars

## Current State
- 346 discussions exist, many profiles (~40+) use identical `dicebear/7.x/adventurer` avatar style with same background colors
- Existing `generate-forum-content` edge function uses fake author names without linking to real `user_id`s
- Need: 5-6 new topics with 2-12 replies from real users, and avatar diversification

## Plan

### 1. Update existing profile avatars via SQL (insert tool)
Run an UPDATE on `profiles` table to replace the uniform `adventurer` avatars with `notionists` style using varied background gradient colors per user. Each profile gets a unique seed + different background color combination from the palette (`ffd5dc`, `c0aede`, `d1d4f9`, `b6e3f4`, `ffdfbf`, `ffd5dc`). Will use each profile's `id` as the seed (already unique) and assign rotating background configs.

### 2. Update `generate-forum-content` edge function
Modify the function to:
- Query real profiles from `profiles` table (with `user_id`)
- Pick random real users as discussion authors and reply authors
- Set `user_id` on both `forum_discussions` and `forum_replies`
- Set `is_approved = true` on replies so they're immediately visible
- Add 6 new fresh topic templates (2025-relevant: tariffs, AI bubble, rate cuts, gold rally, emerging markets rebound, portfolio rebalancing in volatile markets)
- Generate 2-12 random replies per topic

### 3. Invoke the edge function
Call the updated function to generate the 6 new discussions with replies.

### Technical Details
- Avatar UPDATE: single SQL statement with `CASE` or pattern replacement, changing `adventurer` to `notionists` and varying `backgroundType=gradientLinear` with different color combos
- Edge function changes: add `fetchRealUsers()` helper, modify insert logic to include `user_id`, `is_featured: true` (so they're visible), and `is_approved: true` for replies
- No schema changes needed

