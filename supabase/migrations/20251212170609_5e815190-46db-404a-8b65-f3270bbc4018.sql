-- Migration: Drop FK constraints and create 46,000 profiles + 50 discussions with replies

-- Step 1: Drop foreign key constraints that reference auth.users
ALTER TABLE public.forum_discussions DROP CONSTRAINT IF EXISTS forum_discussions_user_id_fkey;
ALTER TABLE public.forum_replies DROP CONSTRAINT IF EXISTS forum_replies_user_id_fkey;
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Step 2: Temporarily disable RLS on profiles
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Step 3: Bulk create 46,000 profiles
DO $$
DECLARE
  i INTEGER;
  user_id UUID;
  username_text TEXT;
  display_name_text TEXT;
  joined_date TIMESTAMP WITH TIME ZONE;
  reputation_val INTEGER;
  posts_val INTEGER;
  first_names TEXT[] := ARRAY['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Quinn', 'Hayden', 'Parker', 'Peyton', 'Cameron', 'Drew', 'Skyler', 'Jamie', 'Finley', 'Dakota', 'River', 'Phoenix', 'Blake', 'Sage', 'Rowan', 'Kendall', 'Emerson', 'Charlie', 'Frankie', 'Marley', 'Reese', 'Jessie', 'Alexis', 'Adrian', 'Sam', 'Chris', 'Max', 'Robin', 'Jesse', 'Angel', 'Pat', 'Lee', 'Kelly', 'Tracy', 'Kim', 'Terry', 'Dana', 'Shannon', 'Jackie', 'Kerry', 'Corey', 'Bobby', 'Ricky'];
  last_names TEXT[] := ARRAY['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Hernandez', 'Moore', 'Martin', 'Jackson', 'Thompson', 'White', 'Lopez', 'Lee', 'Gonzalez', 'Harris', 'Clark', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts', 'Gomez', 'Phillips', 'Evans', 'Turner'];
  first_name TEXT;
  last_name TEXT;
BEGIN
  FOR i IN 1..46000 LOOP
    user_id := gen_random_uuid();
    username_text := 'user_' || LPAD(i::TEXT, 6, '0');
    first_name := first_names[1 + (FLOOR(RANDOM() * 50))::INTEGER];
    last_name := last_names[1 + (FLOOR(RANDOM() * 50))::INTEGER];
    display_name_text := first_name || ' ' || last_name;
    joined_date := NOW() - (RANDOM() * INTERVAL '730 days');
    reputation_val := FLOOR(RANDOM() * 501)::INTEGER;
    posts_val := FLOOR(RANDOM() * 101)::INTEGER;
    
    INSERT INTO public.profiles (id, username, display_name, reputation_score, posts_count, joined_at, created_at, updated_at)
    VALUES (user_id, username_text, display_name_text, reputation_val, posts_val, joined_date, joined_date, joined_date)
    ON CONFLICT (id) DO NOTHING;
  END LOOP;
END;
$$;

-- Step 4: Re-enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Step 5: Create 50 discussions with 2-34 replies each
DO $$
DECLARE
  discussion_id UUID;
  random_profile RECORD;
  reply_author RECORD;
  category_name TEXT;
  discussion_title TEXT;
  discussion_content TEXT;
  reply_content TEXT;
  reply_count INTEGER;
  i INTEGER;
  j INTEGER;
  created_date TIMESTAMP WITH TIME ZONE;
  last_reply_date TIMESTAMP WITH TIME ZONE;
  categories TEXT[] := ARRAY['general', 'stocks', 'crypto', 'etfs', 'beginners', 'news'];
  
  titles TEXT[] := ARRAY[
    'Best ETFs for long-term growth?',
    'Is now a good time to invest in tech stocks?',
    'Bitcoin vs Ethereum - which is better for 2025?',
    'Dividend investing strategies for passive income',
    'How to build a diversified portfolio',
    'What are your thoughts on index funds?',
    'Real estate vs stock market investing',
    'Best brokers with low fees in 2025',
    'Cryptocurrency regulations and their impact',
    'How to analyze a companys financial statements',
    'Growth stocks vs value stocks debate',
    'Retirement planning strategies for millennials',
    'ESG investing - worth it or not?',
    'High yield savings vs investing',
    'Tax efficient investing strategies',
    'Options trading for beginners',
    'DCA vs lump sum investing',
    'Sector rotation strategies',
    'International diversification benefits',
    'REIT investing pros and cons',
    'Bonds in a rising rate environment',
    'Small cap vs large cap stocks',
    'Investing during market volatility',
    'Building an emergency fund',
    'When to sell your investments',
    'Understanding P/E ratios',
    'The importance of asset allocation',
    'AI and tech sector outlook',
    'Healthcare sector investment opportunities',
    'Energy sector trends and outlook',
    'Financial sector analysis',
    'Consumer discretionary stocks review',
    'Industrial sector investment thesis',
    'Materials sector fundamentals',
    'Utilities as defensive investments',
    'Communication services sector trends',
    'Market timing vs buy and hold',
    'Portfolio rebalancing strategies',
    'Understanding market cycles',
    'Inflation protection strategies',
    'Gold as a portfolio hedge',
    'Commodity investing basics',
    'Currency hedging for international investments',
    'Private equity vs public markets',
    'Venture capital investment trends',
    'IPO investing strategies',
    'SPAC investing risks and rewards',
    'Merger arbitrage opportunities',
    'Short selling explained',
    'Factor investing approaches'
  ];
  
  contents TEXT[] := ARRAY[
    'I have been researching this topic extensively and would love to hear your thoughts and experiences.',
    'After analyzing the market trends, I believe there are some interesting opportunities to discuss.',
    'Looking for advice from experienced investors on this matter.',
    'What strategies have worked best for you in this area?',
    'I have some concerns about the current market conditions and wanted to get a discussion going.',
    'Has anyone had experience with this? Would appreciate any insights.',
    'The recent news has got me thinking about this topic. Lets discuss.',
    'I am new to investing and trying to understand this better.',
    'Looking at the data, I see some patterns worth discussing.',
    'This is something I have been researching for a while. Here are my thoughts.'
  ];
  
  reply_templates TEXT[] := ARRAY[
    'Great question! In my experience, the key is to stay consistent and focus on the fundamentals.',
    'I have been doing this for years and here is what I have learned...',
    'The data supports this approach. I would recommend looking at historical trends.',
    'This is an interesting perspective. However, I think we should also consider...',
    'I completely agree with this. Its important to have a long-term view.',
    'In my portfolio, I have allocated about 20% to this strategy.',
    'Thanks for sharing! This is really helpful information.',
    'I had a similar experience. The market can be unpredictable sometimes.',
    'Based on my analysis, I would suggest a different approach.',
    'This reminds me of what happened in 2020. The lessons learned are valuable.',
    'I think the risk/reward ratio here is favorable.',
    'You make a good point. Diversification is indeed crucial.',
    'The fundamentals look solid, but valuation concerns me.',
    'I have been following this closely and the trends are interesting.',
    'Great insights! This aligns with what the experts are saying.',
    'I would add that tax implications are important to consider.',
    'The volatility has been challenging, but opportunities exist.',
    'This is exactly what I was looking for. Thank you!',
    'From a technical analysis perspective, the charts look promising.',
    'I prefer a more conservative approach, but this is valid.',
    'The macroeconomic factors support this thesis.',
    'Be careful with timing - it is notoriously difficult.',
    'I have backtested this strategy with positive results.',
    'The correlation with other assets is something to watch.',
    'This sector has been outperforming the broader market.',
    'I would recommend dollar-cost averaging into this position.',
    'The dividend yield makes this attractive for income investors.',
    'Growth potential is significant but so is the risk.',
    'I added this to my watchlist based on your analysis.',
    'The management team has a strong track record.',
    'Liquidity is an important factor to consider here.',
    'I think we are still early in this trend.',
    'The competition in this space is intensifying.',
    'Regulatory changes could impact this significantly.'
  ];
BEGIN
  FOR i IN 1..50 LOOP
    -- Get random profile for discussion author
    SELECT id, display_name INTO random_profile FROM profiles ORDER BY RANDOM() LIMIT 1;
    
    -- Random category
    category_name := categories[1 + (FLOOR(RANDOM() * 6))::INTEGER];
    
    -- Random title and content
    discussion_title := titles[i];
    discussion_content := contents[1 + (FLOOR(RANDOM() * 10))::INTEGER] || E'\n\n' || 
      'I would love to hear your perspectives on ' || LOWER(titles[i]) || ' and any experiences you can share.';
    
    -- Random created date (within last 90 days)
    created_date := NOW() - (RANDOM() * INTERVAL '90 days');
    
    -- Random reply count between 2 and 34
    reply_count := 2 + FLOOR(RANDOM() * 33)::INTEGER;
    
    -- Generate discussion ID
    discussion_id := gen_random_uuid();
    
    -- Insert discussion
    INSERT INTO forum_discussions (id, user_id, author_name, title, content, category, reply_count, view_count, created_at, updated_at)
    VALUES (discussion_id, random_profile.id, random_profile.display_name, discussion_title, discussion_content, category_name, reply_count, FLOOR(RANDOM() * 1000)::INTEGER, created_date, created_date);
    
    -- Create replies
    last_reply_date := created_date;
    FOR j IN 1..reply_count LOOP
      -- Get random profile for reply author
      SELECT id, display_name INTO reply_author FROM profiles WHERE id != random_profile.id ORDER BY RANDOM() LIMIT 1;
      
      -- Random reply content
      reply_content := reply_templates[1 + (FLOOR(RANDOM() * 34))::INTEGER];
      
      -- Increment time for each reply (random 1-48 hours after previous)
      last_reply_date := last_reply_date + (INTERVAL '1 hour' * (1 + FLOOR(RANDOM() * 48)::INTEGER));
      
      -- Insert reply
      INSERT INTO forum_replies (discussion_id, user_id, author_name, content, created_at)
      VALUES (discussion_id, reply_author.id, reply_author.display_name, reply_content, last_reply_date);
    END LOOP;
    
    -- Update discussion updated_at to last reply date
    UPDATE forum_discussions SET updated_at = last_reply_date WHERE id = discussion_id;
  END LOOP;
END;
$$;