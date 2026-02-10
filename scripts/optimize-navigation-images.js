import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if sharp is available
let sharp;
try {
  sharp = (await import('sharp')).default;
} catch (error) {
  console.error('Error: sharp is not installed. Please install it first:');
  console.error('  npm install --save-dev sharp');
  process.exit(1);
}

// Navigation images directory
const navigationDir = path.join(__dirname, '..', 'public', 'logos', 'navigation');
const outputDir = navigationDir; // Save WebP in same directory

// Target size for icons (72x72 for 2x retina displays)
const TARGET_SIZE = 72;
const QUALITY = 85; // WebP quality (0-100)

// Critical icons that should be preloaded
const CRITICAL_ICONS = [
  'indices.png',
  'stocks.png',
  'commodities.png',
  'crypto.png',
  'currency.png'
];

async function optimizeImage(inputPath, outputPath) {
  try {
    const stats = fs.statSync(inputPath);
    const originalSize = stats.size;
    
    console.log(`Processing ${path.basename(inputPath)}...`);
    console.log(`  Original size: ${(originalSize / 1024).toFixed(2)} KB`);
    
    // Resize and convert to WebP
    await sharp(inputPath)
      .resize(TARGET_SIZE, TARGET_SIZE, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
      })
      .webp({ quality: QUALITY })
      .toFile(outputPath);
    
    const newStats = fs.statSync(outputPath);
    const newSize = newStats.size;
    const reduction = ((1 - newSize / originalSize) * 100).toFixed(1);
    
    console.log(`  WebP size: ${(newSize / 1024).toFixed(2)} KB`);
    console.log(`  Reduction: ${reduction}%`);
    console.log(`  ✓ Optimized\n`);
    
    return {
      original: originalSize,
      optimized: newSize,
      reduction: parseFloat(reduction)
    };
  } catch (error) {
    console.error(`  ✗ Failed to optimize ${path.basename(inputPath)}: ${error.message}\n`);
    return null;
  }
}

async function optimizeAllImages() {
  console.log('Starting optimization of navigation images...\n');
  console.log(`Target size: ${TARGET_SIZE}x${TARGET_SIZE}px`);
  console.log(`WebP quality: ${QUALITY}\n`);
  
  if (!fs.existsSync(navigationDir)) {
    console.error(`Error: Directory ${navigationDir} does not exist`);
    process.exit(1);
  }
  
  // Get all PNG files
  const files = fs.readdirSync(navigationDir)
    .filter(file => file.endsWith('.png') && !file.endsWith('.webp'));
  
  if (files.length === 0) {
    console.log('No PNG files found to optimize');
    return;
  }
  
  console.log(`Found ${files.length} PNG files to optimize\n`);
  
  const results = [];
  let totalOriginal = 0;
  let totalOptimized = 0;
  
  for (const file of files) {
    const inputPath = path.join(navigationDir, file);
    const webpPath = path.join(outputDir, file.replace(/\.png$/i, '.webp'));
    
    const result = await optimizeImage(inputPath, webpPath);
    if (result) {
      results.push({ file, ...result });
      totalOriginal += result.original;
      totalOptimized += result.optimized;
    }
  }
  
  // Summary
  console.log('\n=== Optimization Summary ===');
  console.log(`Total files processed: ${results.length}`);
  console.log(`Total original size: ${(totalOriginal / 1024).toFixed(2)} KB (${(totalOriginal / 1024 / 1024).toFixed(2)} MB)`);
  console.log(`Total optimized size: ${(totalOptimized / 1024).toFixed(2)} KB (${(totalOptimized / 1024 / 1024).toFixed(2)} MB)`);
  const totalReduction = ((1 - totalOptimized / totalOriginal) * 100).toFixed(1);
  console.log(`Total reduction: ${totalReduction}%`);
  console.log(`Space saved: ${((totalOriginal - totalOptimized) / 1024).toFixed(2)} KB (${((totalOriginal - totalOptimized) / 1024 / 1024).toFixed(2)} MB)\n`);
  
  // Critical icons info
  console.log('=== Critical Icons (for preload) ===');
  const criticalResults = results.filter(r => CRITICAL_ICONS.includes(r.file));
  criticalResults.forEach(r => {
    console.log(`  ${r.file.replace('.png', '.webp')}: ${(r.optimized / 1024).toFixed(2)} KB`);
  });
  console.log('');
}

// Run
optimizeAllImages().catch(console.error);

