/**
 * Script to generate prioritized list of articles that need fixing
 * Run with: npx tsx scripts/prioritize-articles.ts
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface ArticleReport {
  id: string;
  type: 'analytics' | 'education';
  title: string;
  author?: string;
  source: string;
  issues: Array<{
    category: 'placeholder' | 'wordCount' | 'structure' | 'aiStyle';
    severity: 'critical' | 'warning' | 'info';
    description: string;
  }>;
  metrics: {
    wordCount: number;
  };
}

interface QualityReport {
  summary: any;
  articles: ArticleReport[];
}

function prioritizeArticles() {
  console.log('📋 Generating prioritized article list...\n');

  const reportPath = join(process.cwd(), 'article-quality-report.json');
  const report: QualityReport = JSON.parse(readFileSync(reportPath, 'utf-8'));

  // Categorize articles by priority
  const prioritized = {
    critical: {
      placeholder: [] as ArticleReport[],
      wordCount: {
        veryLow: [] as ArticleReport[], // < 800 words
        low: [] as ArticleReport[], // 800-1200 words
        medium: [] as ArticleReport[], // 1200-1499 words
      },
    },
    warning: {
      structure: [] as ArticleReport[],
    },
    info: {
      aiStyle: [] as ArticleReport[],
    },
  };

  for (const article of report.articles) {
    // Check for placeholder (highest priority)
    const hasPlaceholder = article.issues.some(i => i.category === 'placeholder' && i.severity === 'critical');
    if (hasPlaceholder) {
      prioritized.critical.placeholder.push(article);
      continue;
    }

    // Check for word count issues
    const wordCountIssue = article.issues.find(i => i.category === 'wordCount' && i.severity === 'critical');
    if (wordCountIssue) {
      const wordCount = article.metrics.wordCount;
      if (wordCount < 800) {
        prioritized.critical.wordCount.veryLow.push(article);
      } else if (wordCount < 1200) {
        prioritized.critical.wordCount.low.push(article);
      } else {
        prioritized.critical.wordCount.medium.push(article);
      }
      continue;
    }

    // Check for structure issues
    const structureIssue = article.issues.find(i => i.category === 'structure');
    if (structureIssue) {
      prioritized.warning.structure.push(article);
    }

    // Check for AI style issues
    const aiStyleIssues = article.issues.filter(i => i.category === 'aiStyle');
    if (aiStyleIssues.length > 0) {
      prioritized.info.aiStyle.push(article);
    }
  }

  // Generate output
  const output = {
    summary: {
      totalArticles: report.articles.length,
      critical: {
        placeholder: prioritized.critical.placeholder.length,
        wordCount: {
          veryLow: prioritized.critical.wordCount.veryLow.length,
          low: prioritized.critical.wordCount.low.length,
          medium: prioritized.critical.wordCount.medium.length,
          total: prioritized.critical.wordCount.veryLow.length + 
                 prioritized.critical.wordCount.low.length + 
                 prioritized.critical.wordCount.medium.length,
        },
      },
      warning: {
        structure: prioritized.warning.structure.length,
      },
      info: {
        aiStyle: prioritized.info.aiStyle.length,
      },
    },
    prioritized: prioritized,
  };

  // Write prioritized list
  const outputPath = join(process.cwd(), 'article-priorities.json');
  writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');

  console.log('✅ Prioritized article list generated!\n');
  console.log('📊 Summary:');
  console.log(`   Critical - Placeholder: ${output.summary.critical.placeholder}`);
  console.log(`   Critical - Word Count:`);
  console.log(`     - Very Low (< 800 words): ${output.summary.critical.wordCount.veryLow}`);
  console.log(`     - Low (800-1200 words): ${output.summary.critical.wordCount.low}`);
  console.log(`     - Medium (1200-1499 words): ${output.summary.critical.wordCount.medium}`);
  console.log(`   Warning - Structure: ${output.summary.warning.structure}`);
  console.log(`   Info - AI Style: ${output.summary.info.aiStyle}`);
  console.log(`\n📄 Full list saved to: ${outputPath}`);
}

prioritizeArticles();

