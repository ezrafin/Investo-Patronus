/**
 * Script to export Google Ads keywords to CSV and text files
 * Run with: npx tsx scripts/export-google-ads-keywords.ts
 */

import { 
  getAllKeywordsForLanguage, 
  exportKeywordsToCSV, 
  exportKeywordsToText,
  getNegativeKeywords,
  getGoogleAdsKeywords,
  type SupportedLanguage,
  type PageType,
  type RegionalVariant,
  type KeywordCategory,
} from '../src/utils/googleAdsKeywords';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const LANGUAGES: SupportedLanguage[] = ['ru', 'en', 'pl', 'de'];
const REGIONS: Record<SupportedLanguage, RegionalVariant[]> = {
  ru: ['RU'],
  en: ['GB', 'IE', 'default'],
  pl: ['PL'],
  de: ['DE', 'AT', 'CH'],
  zh: [],
  es: [],
  fr: [],
};

const PAGE_TYPES: PageType[] = ['home', 'markets', 'news', 'analytics', 'forum', 'companies', 'community', 'courses'];
const CATEGORIES: KeywordCategory[] = ['investment', 'broker', 'forum', 'education', 'analytics', 'news'];

function exportKeywords() {
  const outputDir = join(process.cwd(), 'exports', 'google-ads-keywords');
  
  // Create output directory
  try {
    mkdirSync(outputDir, { recursive: true });
  } catch (error) {
    console.error('Error creating output directory:', error);
    return;
  }

  console.log('Exporting Google Ads keywords...\n');

  // Export by language and region
  LANGUAGES.forEach(language => {
    const regions = REGIONS[language] || ['default'];
    
    regions.forEach(region => {
      console.log(`Exporting ${language} (${region})...`);
      
      // Export all keywords for language and region
      const allKeywords = getAllKeywordsForLanguage(language, 'home', region);
      
      // Export CSV
      const csvContent = exportKeywordsToCSV(allKeywords);
      const csvFileName = `keywords-${language}-${region}.csv`;
      writeFileSync(join(outputDir, csvFileName), csvContent, 'utf-8');
      console.log(`  ✓ Created ${csvFileName} (${allKeywords.length} keywords)`);
      
      // Export text (one per line)
      const textContent = exportKeywordsToText(allKeywords);
      const textFileName = `keywords-${language}-${region}.txt`;
      writeFileSync(join(outputDir, textFileName), textContent, 'utf-8');
      console.log(`  ✓ Created ${textFileName}`);
      
      // Export by category
      CATEGORIES.forEach(category => {
        try {
          const categoryKeywords = getGoogleAdsKeywords(language, category, region);
          
          if (categoryKeywords.length > 0) {
            const categoryCsv = exportKeywordsToCSV(categoryKeywords);
            const categoryFileName = `keywords-${language}-${region}-${category}.csv`;
            writeFileSync(join(outputDir, categoryFileName), categoryCsv, 'utf-8');
          }
        } catch (error) {
          // Skip if category not supported
        }
      });
    });
  });

  // Export negative keywords
  console.log('\nExporting negative keywords...');
  const negativeKeywords: Record<string, string[]> = {};
  
  LANGUAGES.forEach(language => {
    CATEGORIES.forEach(category => {
      const negatives = getNegativeKeywords(language, category);
      const key = `${language}-${category}`;
      negativeKeywords[key] = negatives;
    });
  });

  const negativeCsv = Object.entries(negativeKeywords)
    .map(([key, keywords]) => `${key},${keywords.join(',')}`)
    .join('\n');
  
  writeFileSync(
    join(outputDir, 'negative-keywords.csv'),
    'Category,Negative Keywords\n' + Object.entries(negativeKeywords)
      .map(([key, keywords]) => `${key},"${keywords.join(',')}"`)
      .join('\n'),
    'utf-8'
  );
  console.log('  ✓ Created negative-keywords.csv');

  // Export summary
  const summary = {
    languages: LANGUAGES,
    totalKeywords: LANGUAGES.reduce((sum, lang) => {
      const regions = REGIONS[lang] || ['default'];
      return sum + regions.reduce((s, reg) => {
        return s + getAllKeywordsForLanguage(lang, 'home', reg).length;
      }, 0);
    }, 0),
    exportedAt: new Date().toISOString(),
  };

  writeFileSync(
    join(outputDir, 'summary.json'),
    JSON.stringify(summary, null, 2),
    'utf-8'
  );
  console.log('  ✓ Created summary.json');

  console.log(`\n✅ Export complete! Files saved to: ${outputDir}`);
  console.log(`\nTotal keywords exported: ${summary.totalKeywords}`);
}

// Run export
if (require.main === module) {
  exportKeywords();
}

export { exportKeywords };

