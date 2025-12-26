const fs = require('fs');
const path = require('path');

function getAllKeys(obj, prefix = '') {
  const keys = [];
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys.push(...getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys.sort();
}

const enFile = JSON.parse(fs.readFileSync('src/locales/en/education.json', 'utf8'));
const enKeys = getAllKeys(enFile);

const langs = ['ru', 'de', 'es', 'fr', 'pl', 'zh'];

console.log('Checking translation files...\n');
console.log(`English has ${enKeys.length} keys\n`);

langs.forEach(lang => {
  try {
    const file = JSON.parse(fs.readFileSync(`src/locales/${lang}/education.json`, 'utf8'));
    const fileKeys = getAllKeys(file);
    
    if (enKeys.length !== fileKeys.length) {
      console.log(`${lang}: MISMATCH - ${fileKeys.length} keys (expected ${enKeys.length})`);
      
      const missing = enKeys.filter(k => !fileKeys.includes(k));
      const extra = fileKeys.filter(k => !enKeys.includes(k));
      
      if (missing.length > 0) {
        console.log(`  Missing keys (${missing.length}):`, missing.slice(0, 10));
        if (missing.length > 10) console.log(`  ... and ${missing.length - 10} more`);
      }
      if (extra.length > 0) {
        console.log(`  Extra keys (${extra.length}):`, extra.slice(0, 10));
        if (extra.length > 10) console.log(`  ... and ${extra.length - 10} more`);
      }
    } else {
      const missing = enKeys.filter(k => !fileKeys.includes(k));
      if (missing.length > 0) {
        console.log(`${lang}: MISMATCH - Same count but missing keys:`, missing.slice(0, 10));
      } else {
        console.log(`${lang}: OK - ${fileKeys.length} keys`);
      }
    }
  } catch(e) {
    console.log(`${lang}: ERROR - ${e.message}`);
  }
});

