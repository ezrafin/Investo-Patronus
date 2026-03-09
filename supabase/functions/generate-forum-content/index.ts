import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

const newTopics = [
  { category: "stocks", title: "Is the AI bubble about to pop? Signs to watch in 2025", tags: ["AI", "bubble", "tech"] },
  { category: "general", title: "Fed rate cuts in 2025 — how to position your portfolio", tags: ["Fed", "interest-rates", "strategy"] },
  { category: "stocks", title: "Gold at all-time highs — still worth buying?", tags: ["gold", "commodities", "safe-haven"] },
  { category: "etfs", title: "Emerging markets ETFs making a comeback — best picks?", tags: ["EM", "ETF", "international"] },
  { category: "crypto", title: "Bitcoin after the 2024 halving — where are we heading?", tags: ["BTC", "halving", "prediction"] },
  { category: "general", title: "Portfolio rebalancing in volatile markets — your strategies?", tags: ["portfolio", "rebalancing", "volatility"] },
];

interface ProfileUser {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
}

async function fetchRealUsers(supabase: any): Promise<ProfileUser[]> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, display_name, avatar_url")
    .not("display_name", "is", null)
    .limit(50);
  
  if (error || !data || data.length === 0) {
    console.error("Failed to fetch profiles:", error);
    return [];
  }
  return data;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickRandomCount(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function generateDiscussion(topic: typeof newTopics[0]) {
  const prompt = `You are creating a realistic forum discussion for an investing community. 
Topic: "${topic.title}"
Category: ${topic.category}
Tags: ${topic.tags.join(", ")}

Write a detailed opening post (200-400 words) that:
1. Introduces the topic with personal context or a specific question
2. Shows genuine curiosity and some research
3. Asks 2-3 specific questions for the community
4. Uses a casual but knowledgeable tone

Respond ONLY with the post content, no titles or formatting.`;

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    console.error("AI error generating discussion:", await response.text());
    return null;
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || null;
}

async function generateReplies(title: string, content: string, count: number) {
  const prompt = `You are generating ${count} realistic forum replies to an investing discussion.

Original post title: "${title}"
Original post: "${content.substring(0, 500)}..."

Generate ${count} different replies from various community members. Each reply should:
1. Actually address the specific question or topic raised
2. Share personal experience, specific advice, or helpful resources
3. Include specific numbers, tickers, percentages, or book/resource names when relevant
4. Vary in length (some short 2-3 sentences, some longer with detailed analysis)
5. Show different perspectives (bullish/bearish, experienced/newer, conservative/aggressive)
6. Some should agree, some should offer counterpoints
7. Include concrete examples like "I invested $5000 in VOO in 2020 and it's up 45%"

Format: Return as JSON array of strings, each string being one reply.
Example: ["First reply content here...", "Second reply content...", "Third reply..."]`;

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    console.error("AI error generating replies:", await response.text());
    return [];
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content || "[]";
  
  try {
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return [];
  } catch (e) {
    console.error("Failed to parse replies:", e);
    return [];
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const authSupabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await authSupabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = claimsData.claims.sub;
    const { data: isAdmin } = await authSupabase.rpc('is_admin', { _user_id: userId });
    if (!isAdmin) {
      return new Response(
        JSON.stringify({ error: 'Forbidden - Admin access required' }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { count = 6, withReplies = true, minReplies = 2, maxReplies = 12, offset = 0 } = await req.json();
    
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Fetch real users
    const realUsers = await fetchRealUsers(supabase);
    if (realUsers.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No profiles found to use as authors' }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const results = [];
    const topicsToGenerate = newTopics.slice(offset, Math.min(offset + count, newTopics.length));
    
    for (let i = 0; i < topicsToGenerate.length; i++) {
      const topic = topicsToGenerate[i];
      console.log(`Generating discussion ${i + 1}/${topicsToGenerate.length}: ${topic.title}`);
      
      const content = await generateDiscussion(topic);
      if (!content) continue;

      const author = pickRandom(realUsers);
      const daysAgo = Math.floor(Math.random() * 30) + 1;
      const createdAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString();
      
      const { data: discussion, error: discussionError } = await supabase
        .from("forum_discussions")
        .insert({
          title: topic.title,
          content: content,
          category: topic.category,
          tags: topic.tags,
          author_name: author.display_name || 'Investor',
          user_id: author.id,
          created_at: createdAt,
          updated_at: createdAt,
          view_count: Math.floor(Math.random() * 500) + 50,
          is_featured: true,
        })
        .select()
        .single();

      if (discussionError) {
        console.error("Error inserting discussion:", discussionError);
        continue;
      }

      let repliesGenerated = 0;
      
      if (withReplies) {
        const replyCount = pickRandomCount(minReplies, maxReplies);
        const replies = await generateReplies(topic.title, content, replyCount);
        
        for (const replyContent of replies) {
          if (!replyContent || typeof replyContent !== 'string') continue;
          
          const replyAuthor = pickRandom(realUsers);
          const replyDaysAgo = Math.floor(Math.random() * daysAgo);
          const replyCreatedAt = new Date(Date.now() - replyDaysAgo * 24 * 60 * 60 * 1000).toISOString();
          
          const { error: replyError } = await supabase
            .from("forum_replies")
            .insert({
              discussion_id: discussion.id,
              content: replyContent,
              author_name: replyAuthor.display_name || 'Investor',
              user_id: replyAuthor.id,
              created_at: replyCreatedAt,
              is_approved: true,
            });

          if (!replyError) {
            repliesGenerated++;
          } else {
            console.error("Error inserting reply:", replyError);
          }
        }

        await supabase
          .from("forum_discussions")
          .update({ 
            reply_count: repliesGenerated,
            updated_at: new Date().toISOString()
          })
          .eq("id", discussion.id);
      }

      results.push({
        title: topic.title,
        category: topic.category,
        authorName: author.display_name,
        repliesGenerated,
      });

      // Small delay between topics
      await new Promise(r => setTimeout(r, 1000));
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        generated: results.length,
        results 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error in generate-forum-content:", error);
    return new Response(
      JSON.stringify({ error: 'An error occurred while generating content' }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
