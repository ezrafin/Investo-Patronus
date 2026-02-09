import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import { createHash } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Missing image slugs
const MISSING_SLUGS = [
  'european-defense-and-aerospace-investment-opportunities-in-a-changing-geopolitical-landscape',
  'ai-regulation-and-compliance-investment-implications-for-tech-companies',
  'central-bank-digital-currencies-cbdcs-market-impact-and-investment-opportunities',
  'green-bonds-and-sustainability-linked-bonds-the-evolution-of-fixed-income-markets'
];

// Get Pexels API key from environment variable or command line argument (optional)
const PEXELS_API_KEY = process.env.PEXELS_API_KEY || process.argv[2];

if (!PEXELS_API_KEY) {
  console.warn('Warning: PEXELS_API_KEY not provided. Will use Picsum Photos fallback for all images.');
  console.warn('For better image quality, set PEXELS_API_KEY as environment variable or pass as argument.\n');
}

// Create analytics directory
const analyticsDir = path.join(__dirname, '..', 'public', 'analytics');
if (!fs.existsSync(analyticsDir)) {
  fs.mkdirSync(analyticsDir, { recursive: true });
}

// Function to download image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirects
        file.close();
        fs.unlinkSync(filepath);
        downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
      } else {
        file.close();
        fs.unlinkSync(filepath);
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      reject(err);
    });
  });
}

// Stop words to exclude from keywords
const STOP_WORDS = new Set([
  'and', 'the', 'for', 'in', 'of', 'to', 'a', 'an', 'on', 'at', 'by', 'with',
  'from', 'as', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have',
  'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
  'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'it',
  'its', 'or', 'but', 'not', 'if', 'then', 'than', 'so', 'such', 'more',
  'most', 'very', 'just', 'only', 'also', 'too', 'well', 'now', 'here',
  'there', 'when', 'where', 'why', 'how', 'all', 'each', 'both', 'few',
  'many', 'other', 'some', 'same', 'own', 'new', 'old', 'first', 'last',
  'next', 'previous', 'another', 'one', 'two', 'three', 'four', 'five',
  'six', 'seven', 'eight', 'nine', 'ten', 'vs', 'versus', 'vs-', 'the-'
]);

// Function to extract keywords from slug
function extractKeywords(slug) {
  // Split slug by hyphens and filter out stop words and short words
  const words = slug
    .split('-')
    .filter(word => {
      // Remove stop words, numbers, and very short words
      return word.length > 2 && 
             !STOP_WORDS.has(word.toLowerCase()) && 
             !/^\d+$/.test(word);
    })
    .map(word => word.toLowerCase());

  // Prioritize thematic words (first 3-5 words are usually most important)
  // Also add finance/business context for better relevance
  const keywords = words.slice(0, 5).join(' ');
  
  // Add finance/business context if not already present
  const hasFinanceContext = words.some(w => 
    ['finance', 'investment', 'market', 'trading', 'business', 'economic', 'financial'].includes(w)
  );
  
  if (!hasFinanceContext && keywords) {
    return `${keywords} finance business`;
  }
  
  return keywords || 'finance business investment';
}

// Function to search Pexels API for relevant image
async function searchPexelsImage(keywords, apiKey) {
  return new Promise((resolve, reject) => {
    const encodedKeywords = encodeURIComponent(keywords);
    const url = `https://api.pexels.com/v1/search?query=${encodedKeywords}&per_page=1&orientation=landscape&size=large`;
    
    const options = {
      headers: {
        'Authorization': apiKey
      }
    };

    https.get(url, options, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        if (response.statusCode === 200) {
          try {
            const json = JSON.parse(data);
            if (json.photos && json.photos.length > 0) {
              // Get the largest available size (preferably 1600x900 or closest)
              const photo = json.photos[0];
              const src = photo.src;
              
              // Prefer large landscape image
              const imageUrl = src.large2x || src.large || src.medium || src.original;
              resolve(imageUrl);
            } else {
              reject(new Error('No images found'));
            }
          } catch (error) {
            reject(new Error(`Failed to parse Pexels response: ${error.message}`));
          }
        } else if (response.statusCode === 429) {
          // Rate limit exceeded
          reject(new Error('Rate limit exceeded'));
        } else {
          reject(new Error(`Pexels API error: ${response.statusCode}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Function to generate seed from slug for deterministic images (fallback)
function getSeedFromSlug(slug) {
  const hash = createHash('md5').update(slug).digest('hex');
  // Convert first 8 hex chars to number (for Picsum seed)
  return parseInt(hash.substring(0, 8), 16);
}

// Function to get Picsum fallback URL
function getPicsumFallbackUrl(slug) {
  const seed = getSeedFromSlug(slug);
  // Picsum Photos with seed - gives deterministic unique images
  // Size: 1600x900 (wide aspect ratio for analytics cards)
  return `https://picsum.photos/seed/${seed}/1600/900`;
}

// Function to get image URL - try Pexels first, fallback to Picsum
async function getImageUrl(slug, apiKey) {
  if (!apiKey) {
    // No API key, use Picsum directly
    return { url: getPicsumFallbackUrl(slug), source: 'picsum' };
  }
  
  try {
    const keywords = extractKeywords(slug);
    console.log(`  Keywords: ${keywords}`);
    const pexelsUrl = await searchPexelsImage(keywords, apiKey);
    return { url: pexelsUrl, source: 'pexels' };
  } catch (error) {
    console.warn(`  Pexels failed: ${error.message}, using Picsum fallback`);
    return { url: getPicsumFallbackUrl(slug), source: 'picsum' };
  }
}

async function downloadMissingImages() {
  console.log(`Starting download of ${MISSING_SLUGS.length} missing images...\n`);
  
  let successCount = 0;
  let failCount = 0;
  let pexelsCount = 0;
  let picsumCount = 0;
  const failed = [];

  for (let i = 0; i < MISSING_SLUGS.length; i++) {
    const slug = MISSING_SLUGS[i];
    const imagePath = path.join(analyticsDir, `${slug}.jpg`);
    
    // Skip if already exists
    if (fs.existsSync(imagePath)) {
      console.log(`[${i + 1}/${MISSING_SLUGS.length}] Skipping ${slug}.jpg (already exists)`);
      successCount++;
      continue;
    }

    try {
      console.log(`[${i + 1}/${MISSING_SLUGS.length}] Processing ${slug}.jpg...`);
      
      // Get image URL (Pexels with Picsum fallback)
      const { url: imageUrl, source } = await getImageUrl(slug, PEXELS_API_KEY);
      
      if (source === 'pexels') {
        pexelsCount++;
      } else {
        picsumCount++;
      }
      
      // Download image
      await downloadImage(imageUrl, imagePath);
      
      successCount++;
      console.log(`✓ Downloaded ${slug}.jpg (${source})\n`);
      
      // Rate limiting: Pexels allows 200 requests/hour = ~18 seconds between requests
      // Add delay to stay within limits
      if (source === 'pexels' && i < MISSING_SLUGS.length - 1) {
        console.log('  Waiting 18 seconds for rate limit...\n');
        await new Promise(resolve => setTimeout(resolve, 18000)); // 18 seconds
      } else if (source === 'picsum' && i < MISSING_SLUGS.length - 1) {
        // Smaller delay for Picsum fallback
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      failCount++;
      failed.push(slug);
      console.error(`✗ Failed to download ${slug}.jpg: ${error.message}\n`);
      
      // Still add delay even on error to avoid hammering APIs
      if (i < MISSING_SLUGS.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  console.log('\n=== Download Summary ===');
  console.log(`Total: ${MISSING_SLUGS.length}`);
  console.log(`Success: ${successCount}`);
  console.log(`Failed: ${failCount}`);
  console.log(`Pexels: ${pexelsCount}`);
  console.log(`Picsum (fallback): ${picsumCount}`);
  
  if (failed.length > 0) {
    console.log('\nFailed slugs:');
    failed.forEach(slug => console.log(`  - ${slug}`));
  }
}

// Run
downloadMissingImages().catch(console.error);

