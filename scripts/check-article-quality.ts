/**
 * Script to check article quality and detect placeholder content, AI-style writing, and structural issues
 * Run with: tsx scripts/check-article-quality.ts
 */

import { writeFileSync } from 'fs';
import { join } from 'path';
import { AnalyticsArticle } from '../src/lib/api/types';
import { christinaArticles } from '../src/lib/api/analytics-christina';
import { assuntaArticles } from '../src/lib/api/analytics-assunta';
import { lysanderArticles } from '../src/lib/api/analytics-lysander';
import { eliasArticles } from '../src/lib/api/analytics-elias';
import { anastasiaArticles } from '../src/lib/api/analytics-anastasia';
import { lucaArticles } from '../src/lib/api/analytics-luca';
import { isabelleArticles } from '../src/lib/api/analytics-isabelle';
import { xuArticles } from '../src/lib/api/analytics-xu';
import { basicArticles, advancedArticles, Article } from '../src/data/educationArticles';

// Types for the report
interface ArticleIssue {
  category: 'placeholder' | 'wordCount' | 'structure' | 'aiStyle';
  severity: 'critical' | 'warning' | 'info';
  description: string;
  evidence?: string;
}

interface ArticleMetrics {
  wordCount: number;
  headingLevels: number;
  listCount: number;
  paragraphCount: number;
  sentenceVariety: number;
  clicheCount: number;
  hasExamples: boolean;
  hasQuotes: boolean;
  repetitionScore: number;
  formalityScore: number;
}

interface ArticleReport {
  id: string;
  type: 'analytics' | 'education';
  title: string;
  author?: string;
  source: string;
  issues: ArticleIssue[];
  metrics: ArticleMetrics;
}

interface QualityReport {
  summary: {
    totalArticles: number;
    problematicArticles: number;
    byCategory: {
      placeholder: number;
      wordCount: number;
      structure: number;
      aiStyle: number;
    };
  };
  articles: ArticleReport[];
}

// Placeholder phrases to detect
const PLACEHOLDER_PHRASES = [
  'this is a placeholder',
  'placeholder for',
  'production environment',
  'would contain',
  'in a production',
  'complete educational material',
  'sections, examples, charts',
  'interactive elements',
  'full article content',
];

// AI clichés and overused phrases (English)
const AI_CLICHES = [
  'it\'s important to note',
  'it\'s worth mentioning',
  'as we can see',
  'in conclusion',
  'it should be noted',
  'it is worth noting',
  'it is important to',
  'it is crucial to',
  'it is essential to',
  'it is necessary to',
  'one must consider',
  'one should note',
  'it becomes clear',
  'it is evident',
  'it is clear that',
  'it can be seen',
  'it must be emphasized',
  'it should be emphasized',
  'it is worth emphasizing',
  'in this context',
  'in this regard',
  'in this case',
  'in this situation',
  'in this scenario',
  'it is worth considering',
  'it is important to consider',
  'it is crucial to consider',
  'it is essential to consider',
  'it is necessary to consider',
  'it is important to understand',
  'it is crucial to understand',
  'it is essential to understand',
  'it is necessary to understand',
  'it is important to remember',
  'it is crucial to remember',
  'it is essential to remember',
  'it is necessary to remember',
  'it is important to keep in mind',
  'it is crucial to keep in mind',
  'it is essential to keep in mind',
  'it is necessary to keep in mind',
  'it is important to bear in mind',
  'it is crucial to bear in mind',
  'it is essential to bear in mind',
  'it is necessary to bear in mind',
  'it is important to recognize',
  'it is crucial to recognize',
  'it is essential to recognize',
  'it is necessary to recognize',
  'it is important to acknowledge',
  'it is crucial to acknowledge',
  'it is essential to acknowledge',
  'it is necessary to acknowledge',
  'it is important to realize',
  'it is crucial to realize',
  'it is essential to realize',
  'it is necessary to realize',
  'it is important to appreciate',
  'it is crucial to appreciate',
  'it is essential to appreciate',
  'it is necessary to appreciate',
  'it is important to understand that',
  'it is crucial to understand that',
  'it is essential to understand that',
  'it is necessary to understand that',
  'it is important to note that',
  'it is crucial to note that',
  'it is essential to note that',
  'it is necessary to note that',
  'it is important to remember that',
  'it is crucial to remember that',
  'it is essential to remember that',
  'it is necessary to remember that',
  'it is important to keep in mind that',
  'it is crucial to keep in mind that',
  'it is essential to keep in mind that',
  'it is necessary to keep in mind that',
  'it is important to bear in mind that',
  'it is crucial to bear in mind that',
  'it is essential to bear in mind that',
  'it is necessary to bear in mind that',
  'it is important to recognize that',
  'it is crucial to recognize that',
  'it is essential to recognize that',
  'it is necessary to recognize that',
  'it is important to acknowledge that',
  'it is crucial to acknowledge that',
  'it is essential to acknowledge that',
  'it is necessary to acknowledge that',
  'it is important to realize that',
  'it is crucial to realize that',
  'it is essential to realize that',
  'it is necessary to realize that',
  'it is important to appreciate that',
  'it is crucial to appreciate that',
  'it is essential to appreciate that',
  'it is necessary to appreciate that',
];

// Minimum requirements
const MIN_WORD_COUNT = 1500;
const MIN_HEADING_LEVELS = 3;
const MIN_PARAGRAPHS = 10;
const MIN_LISTS = 2;

/**
 * Count words in text, excluding markdown syntax
 */
function countWords(text: string): number {
  // Remove markdown headers, links, images, code blocks, etc.
  const cleaned = text
    .replace(/```[\s\S]*?```/g, '') // Code blocks
    .replace(/`[^`]+`/g, '') // Inline code
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Links, keep text
    .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '') // Images
    .replace(/^#{1,6}\s+/gm, '') // Headers
    .replace(/\*\*([^\*]+)\*\*/g, '$1') // Bold
    .replace(/\*([^\*]+)\*/g, '$1') // Italic
    .replace(/^\s*[-*+]\s+/gm, '') // List markers
    .replace(/^\s*\d+\.\s+/gm, '') // Numbered list markers
    .replace(/>\s+/g, '') // Blockquotes
    .trim();
  
  const words = cleaned.split(/\s+/).filter(word => word.length > 0);
  return words.length;
}

/**
 * Check for placeholder text
 */
function checkPlaceholder(text: string): { found: boolean; evidence?: string } {
  const lowerText = text.toLowerCase();
  for (const phrase of PLACEHOLDER_PHRASES) {
    if (lowerText.includes(phrase)) {
      // Find the context around the phrase
      const index = lowerText.indexOf(phrase);
      const start = Math.max(0, index - 50);
      const end = Math.min(text.length, index + phrase.length + 50);
      const evidence = text.substring(start, end).trim();
      return { found: true, evidence };
    }
  }
  return { found: false };
}

/**
 * Analyze article structure
 */
function analyzeStructure(text: string): {
  headingLevels: number;
  listCount: number;
  paragraphCount: number;
} {
  const lines = text.split('\n');
  const headingLevels = new Set<number>();
  let listCount = 0;
  let paragraphCount = 0;
  let inParagraph = false;

  for (const line of lines) {
    const trimmed = line.trim();
    
    // Check for headings
    const headingMatch = trimmed.match(/^(#{1,6})\s+/);
    if (headingMatch) {
      headingLevels.add(headingMatch[1].length);
      inParagraph = false;
      continue;
    }
    
    // Check for lists
    if (/^\s*[-*+]\s+/.test(trimmed) || /^\s*\d+\.\s+/.test(trimmed)) {
      listCount++;
      inParagraph = false;
      continue;
    }
    
    // Check for paragraphs (non-empty lines that aren't code blocks or other markdown)
    if (trimmed.length > 0 && !trimmed.startsWith('```') && !trimmed.startsWith('>')) {
      if (!inParagraph) {
        paragraphCount++;
        inParagraph = true;
      }
    } else {
      inParagraph = false;
    }
  }

  return {
    headingLevels: headingLevels.size,
    listCount,
    paragraphCount,
  };
}

/**
 * Find AI clichés in text
 */
function findCliches(text: string): { count: number; examples: string[] } {
  const lowerText = text.toLowerCase();
  const found: string[] = [];
  
  for (const cliche of AI_CLICHES) {
    const regex = new RegExp(cliche.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const matches = text.match(regex);
    if (matches) {
      found.push(...matches.slice(0, 3)); // Limit examples
    }
  }
  
  return {
    count: found.length,
    examples: found.slice(0, 5), // Limit to 5 examples
  };
}

/**
 * Analyze sentence variety
 */
function analyzeSentenceVariety(text: string): number {
  // Remove markdown and extract sentences
  const cleaned = text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*([^\*]+)\*\*/g, '$1')
    .replace(/\*([^\*]+)\*/g, '$1')
    .trim();
  
  const sentences = cleaned
    .split(/[.!?]+\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
  
  if (sentences.length < 2) return 0;
  
  // Calculate sentence lengths
  const lengths = sentences.map(s => s.split(/\s+/).length);
  const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  
  // Calculate coefficient of variation (standard deviation / mean)
  const variance = lengths.reduce((sum, len) => sum + Math.pow(len - avgLength, 2), 0) / lengths.length;
  const stdDev = Math.sqrt(variance);
  const cv = avgLength > 0 ? stdDev / avgLength : 0;
  
  // Normalize to 0-1 range (higher is better, cap at 1.0)
  return Math.min(cv, 1.0);
}

/**
 * Detect repetitions in text
 */
function detectRepetitions(text: string): number {
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 4); // Only check words longer than 4 characters
  
  const wordCounts = new Map<string, number>();
  for (const word of words) {
    wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
  }
  
  // Count words that appear more than 5 times
  let repetitionCount = 0;
  for (const count of wordCounts.values()) {
    if (count > 5) {
      repetitionCount++;
    }
  }
  
  // Normalize: more repetitions = higher score (bad)
  return Math.min(repetitionCount / 20, 1.0);
}

/**
 * Check for concrete examples (numbers, dates, company names)
 */
function checkForExamples(text: string): boolean {
  // Check for numbers (years, percentages, etc.)
  const hasNumbers = /\d{4}|\d+%|\$\d+/.test(text);
  
  // Check for company names (capitalized words that might be companies)
  const hasCompanyNames = /\b[A-Z][a-z]+ (Inc|Corp|LLC|Ltd|Company|Technologies|Systems|Group)\b/i.test(text);
  
  // Check for dates
  const hasDates = /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b/i.test(text);
  
  // Check for specific data points
  const hasDataPoints = /\d+\.\d+%|\$\d+\.\d+[BMK]?/i.test(text);
  
  return hasNumbers || hasCompanyNames || hasDates || hasDataPoints;
}

/**
 * Analyze formality (detect overly formal/stiff language)
 */
function analyzeFormality(text: string): number {
  // Very formal phrases that indicate AI-style writing
  const formalPhrases = [
    'it is important to',
    'it is crucial to',
    'it is essential to',
    'it is necessary to',
    'one must',
    'one should',
    'it should be noted',
    'it is worth noting',
    'it is worth mentioning',
    'it is important to note',
    'it is crucial to note',
    'it is essential to note',
    'it is necessary to note',
  ];
  
  const lowerText = text.toLowerCase();
  let formalCount = 0;
  
  for (const phrase of formalPhrases) {
    const regex = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const matches = lowerText.match(regex);
    if (matches) {
      formalCount += matches.length;
    }
  }
  
  // Normalize: more formal phrases = higher score (bad)
  // Consider text formal if it has more than 5 such phrases per 1000 words
  const wordCount = countWords(text);
  const formalRatio = wordCount > 0 ? (formalCount / wordCount) * 1000 : 0;
  return Math.min(formalRatio / 10, 1.0); // Cap at 1.0
}

/**
 * Check for quotes and references
 */
function checkForQuotes(text: string): boolean {
  // Check for quoted text
  const hasQuotes = /["'""].{20,}["'""]/.test(text);
  
  // Check for citation patterns
  const hasCitations = /\([A-Z][a-z]+(?:\s+et\s+al\.?)?\s+\d{4}\)/i.test(text);
  
  // Check for reference sections
  const hasReferences = /(?:references?|sources?|bibliography)/i.test(text);
  
  // Check for links (might indicate sources)
  const hasLinks = /\[([^\]]+)\]\([^\)]+\)/.test(text);
  
  return hasQuotes || hasCitations || hasReferences || hasLinks;
}

/**
 * Comprehensive AI style detection
 */
function detectAIStyle(text: string): {
  clicheCount: number;
  sentenceVariety: number;
  repetitionScore: number;
  hasExamples: boolean;
  formalityScore: number;
  hasQuotes: boolean;
} {
  const cliches = findCliches(text);
  
  return {
    clicheCount: cliches.count,
    sentenceVariety: analyzeSentenceVariety(text),
    repetitionScore: detectRepetitions(text),
    hasExamples: checkForExamples(text),
    formalityScore: analyzeFormality(text),
    hasQuotes: checkForQuotes(text),
  };
}

/**
 * Check an analytics article
 */
function checkAnalyticsArticle(
  article: AnalyticsArticle,
  source: string
): ArticleReport {
  const content = article.sections
    ? article.sections.map(s => `${s.heading}\n\n${s.content}`).join('\n\n')
    : article.content;
  
  const wordCount = countWords(content);
  const placeholder = checkPlaceholder(content);
  const structure = analyzeStructure(content);
  const aiStyle = detectAIStyle(content);
  
  const issues: ArticleIssue[] = [];
  
  // Check placeholder
  if (placeholder.found) {
    issues.push({
      category: 'placeholder',
      severity: 'critical',
      description: 'Article contains placeholder text',
      evidence: placeholder.evidence,
    });
  }
  
  // Check word count
  if (wordCount < MIN_WORD_COUNT) {
    issues.push({
      category: 'wordCount',
      severity: 'critical',
      description: `Article has only ${wordCount} words, minimum required is ${MIN_WORD_COUNT}`,
    });
  }
  
  // Check structure
  if (structure.headingLevels < MIN_HEADING_LEVELS) {
    issues.push({
      category: 'structure',
      severity: 'warning',
      description: `Article has only ${structure.headingLevels} heading level(s), minimum recommended is ${MIN_HEADING_LEVELS}`,
    });
  }
  
  if (structure.paragraphCount < MIN_PARAGRAPHS) {
    issues.push({
      category: 'structure',
      severity: 'warning',
      description: `Article has only ${structure.paragraphCount} paragraph(s), minimum recommended is ${MIN_PARAGRAPHS}`,
    });
  }
  
  if (structure.listCount < MIN_LISTS) {
    issues.push({
      category: 'structure',
      severity: 'info',
      description: `Article has only ${structure.listCount} list(s), minimum recommended is ${MIN_LISTS}`,
    });
  }
  
  // Check AI style
  if (aiStyle.clicheCount > 5) {
    issues.push({
      category: 'aiStyle',
      severity: 'warning',
      description: `Article contains ${aiStyle.clicheCount} AI clichés or overused phrases`,
      evidence: aiStyle.clicheCount > 0 ? 'Multiple instances of formal/AI-style phrases detected' : undefined,
    });
  }
  
  if (aiStyle.sentenceVariety < 0.3) {
    issues.push({
      category: 'aiStyle',
      severity: 'warning',
      description: 'Article shows low sentence variety, indicating repetitive sentence structures',
    });
  }
  
  if (aiStyle.repetitionScore > 0.5) {
    issues.push({
      category: 'aiStyle',
      severity: 'info',
      description: 'Article shows high word repetition, may indicate AI-generated content',
    });
  }
  
  if (!aiStyle.hasExamples) {
    issues.push({
      category: 'aiStyle',
      severity: 'info',
      description: 'Article lacks concrete examples (numbers, dates, company names, specific data)',
    });
  }
  
  if (aiStyle.formalityScore > 0.5) {
    issues.push({
      category: 'aiStyle',
      severity: 'warning',
      description: 'Article shows high formality score, may indicate AI-generated or overly formal writing',
    });
  }
  
  if (!aiStyle.hasQuotes) {
    issues.push({
      category: 'aiStyle',
      severity: 'info',
      description: 'Article lacks quotes, citations, or references to sources',
    });
  }
  
  const metrics: ArticleMetrics = {
    wordCount,
    headingLevels: structure.headingLevels,
    listCount: structure.listCount,
    paragraphCount: structure.paragraphCount,
    sentenceVariety: aiStyle.sentenceVariety,
    clicheCount: aiStyle.clicheCount,
    hasExamples: aiStyle.hasExamples,
    hasQuotes: aiStyle.hasQuotes,
    repetitionScore: aiStyle.repetitionScore,
    formalityScore: aiStyle.formalityScore,
  };
  
  return {
    id: article.slug,
    type: 'analytics',
    title: article.title,
    author: article.author,
    source,
    issues,
    metrics,
  };
}

/**
 * Check an education article
 * Note: Education articles don't have content, they use placeholder in the UI
 */
function checkEducationArticle(article: Article, source: string): ArticleReport {
  // Education articles always use placeholder, so mark them as such
  const issues: ArticleIssue[] = [
    {
      category: 'placeholder',
      severity: 'critical',
      description: 'Education article uses placeholder content in the UI (no actual content field)',
    },
  ];
  
  const metrics: ArticleMetrics = {
    wordCount: 0,
    headingLevels: 0,
    listCount: 0,
    paragraphCount: 0,
    sentenceVariety: 0,
    clicheCount: 0,
    hasExamples: false,
    hasQuotes: false,
    repetitionScore: 0,
    formalityScore: 0,
  };
  
  return {
    id: article.id,
    type: 'education',
    title: article.title,
    author: article.type === 'advanced' ? article.author : undefined,
    source,
    issues,
    metrics,
  };
}

/**
 * Main function to generate quality report
 */
async function generateQualityReport() {
  console.log('🔍 Starting article quality check...\n');
  
  const reports: ArticleReport[] = [];
  
  // Check analytics articles
  console.log('Checking analytics articles...');
  
  // Try to get quickAnalytics from analytics.ts (may not be exported)
  let quickAnalyticsArticles: AnalyticsArticle[] = [];
  try {
    // Use dynamic import to access non-exported quickAnalytics
    const analyticsModule = await import('../src/lib/api/analytics.js');
    // If quickAnalytics is not exported, we'll skip it
    if ('quickAnalytics' in analyticsModule) {
      quickAnalyticsArticles = (analyticsModule as any).quickAnalytics || [];
    }
  } catch (error) {
    // If import fails or quickAnalytics doesn't exist, continue without it
    console.log('  Note: quickAnalytics not available for checking (may not be exported)');
  }
  
  const analyticsSources = [
    ...(quickAnalyticsArticles.length > 0 ? [{ articles: quickAnalyticsArticles, source: 'analytics.ts (quickAnalytics)' }] : []),
    { articles: christinaArticles, source: 'analytics-christina.ts' },
    { articles: assuntaArticles, source: 'analytics-assunta.ts' },
    { articles: lysanderArticles, source: 'analytics-lysander.ts' },
    { articles: eliasArticles, source: 'analytics-elias.ts' },
    { articles: anastasiaArticles, source: 'analytics-anastasia.ts' },
    { articles: lucaArticles, source: 'analytics-luca.ts' },
    { articles: isabelleArticles, source: 'analytics-isabelle.ts' },
    { articles: xuArticles, source: 'analytics-xu.ts' },
  ];
  
  for (const { articles, source } of analyticsSources) {
    for (const article of articles) {
      const report = checkAnalyticsArticle(article, source);
      if (report.issues.length > 0) {
        reports.push(report);
      }
    }
  }
  
  console.log(`  ✓ Checked ${analyticsSources.reduce((sum, s) => sum + s.articles.length, 0)} analytics articles`);
  
  // Check education articles
  console.log('Checking education articles...');
  
  for (const article of basicArticles) {
    const report = checkEducationArticle(article, 'educationArticles.ts (basic)');
    reports.push(report); // All education articles have placeholder
  }
  
  for (const article of advancedArticles) {
    const report = checkEducationArticle(article, 'educationArticles.ts (advanced)');
    reports.push(report); // All education articles have placeholder
  }
  
  console.log(`  ✓ Checked ${basicArticles.length + advancedArticles.length} education articles`);
  
  // Generate summary
  const summary = {
    totalArticles: analyticsSources.reduce((sum, s) => sum + s.articles.length, 0) + basicArticles.length + advancedArticles.length,
    problematicArticles: reports.length,
    byCategory: {
      placeholder: reports.filter(r => r.issues.some(i => i.category === 'placeholder')).length,
      wordCount: reports.filter(r => r.issues.some(i => i.category === 'wordCount')).length,
      structure: reports.filter(r => r.issues.some(i => i.category === 'structure')).length,
      aiStyle: reports.filter(r => r.issues.some(i => i.category === 'aiStyle')).length,
    },
  };
  
  const qualityReport: QualityReport = {
    summary,
    articles: reports,
  };
  
  // Write report to file
  const outputPath = join(process.cwd(), 'article-quality-report.json');
  writeFileSync(outputPath, JSON.stringify(qualityReport, null, 2), 'utf-8');
  
  console.log('\n✅ Quality report generated successfully!');
  console.log(`   Output: ${outputPath}`);
  console.log(`\n📊 Summary:`);
  console.log(`   Total articles: ${summary.totalArticles}`);
  console.log(`   Problematic articles: ${summary.problematicArticles}`);
  console.log(`   - Placeholder issues: ${summary.byCategory.placeholder}`);
  console.log(`   - Word count issues: ${summary.byCategory.wordCount}`);
  console.log(`   - Structure issues: ${summary.byCategory.structure}`);
  console.log(`   - AI style issues: ${summary.byCategory.aiStyle}`);
}

// Run the script
generateQualityReport().catch((error) => {
  console.error('❌ Error generating quality report:', error);
  process.exit(1);
});

