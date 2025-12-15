export interface AuthorProfile {
  id: string;
  username: string | null;
  display_name: string;
  avatar_url: string | null;
  bio: string;
  reputation: number;
  post_count: number;
  comment_count: number;
}

export const authors: AuthorProfile[] = [
  {
    id: 'christina-summerbell',
    username: 'christina_summerbell',
    display_name: 'Christina Summerbell',
    avatar_url:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    bio: 'Senior market analyst with 15+ years of experience in equity research and portfolio management, specializing in technology and growth stocks.',
    reputation: 2450,
    post_count: 156,
    comment_count: 892,
  },
  {
    id: 'assunta-novak',
    username: 'assunta_novak',
    display_name: 'Assunta Novak',
    avatar_url:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
    bio: 'Cryptocurrency and blockchain researcher covering digital assets and market structure since 2015.',
    reputation: 1890,
    post_count: 89,
    comment_count: 567,
  },
  {
    id: 'sorrel-danvers',
    username: 'sorrel_danvers',
    display_name: 'Sorrel Danvers',
    avatar_url:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
    bio: 'Commodities analyst focused on precious metals and energy markets with a background in trading.',
    reputation: 1560,
    post_count: 112,
    comment_count: 345,
  },
  {
    id: 'lysander-truog',
    username: 'lysander_truog',
    display_name: 'Lysander Truog',
    avatar_url:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face',
    bio: 'Fixed income specialist covering bond markets and interest rate dynamics for long-term investors.',
    reputation: 1320,
    post_count: 134,
    comment_count: 410,
  },
];


