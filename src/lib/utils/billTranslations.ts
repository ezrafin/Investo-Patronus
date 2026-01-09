/**
 * Utility function to get translated bill name
 * This should be used in components that have access to useTranslation hook
 */
export function getBillNameTranslationKey(billId: string): string {
  return `billCollection.billNames.${billId}`;
}

/**
 * Get all bill IDs that need translations
 * This list should match the bill_id values in the database
 */
export const BILL_IDS = [
  'homepage_visit',
  'forum_first_visit',
  'forum_search',
  'forum_react',
  'markets_page_visit',
  'markets_type_visit',
  'analytics_read',
  'news_read',
  'basic_article_read',
  'advanced_article_read',
  'profile_own_visit',
  'profile_other_visit',
  'watchlist_create',
  'collection_create',
  'company_visit',
  'discussion_create',
  'reply_create',
  'bookmark_add',
  'alert_create',
  'settings_visit',
  'education_visit',
  'course_start',
  'tools_visit',
  'crypto_page',
  'stocks_page',
  'commodities_page',
  'currencies_page',
  'indices_page',
  'theme_change',
  'language_change',
  'legendary_hidden_treasure',
  'companies_page_visit',
] as const;

