import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(__dirname, '..', 'src');
const LOCALES_DIR = path.join(SRC_DIR, 'locales');

function walk(dir, exts, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, exts, files);
    } else if (exts.includes(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

function loadJsonSafe(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    console.error(`[ERROR] Failed to load JSON: ${filePath}`, e.message);
    return null;
  }
}

// Map: namespace -> key ("toast.xyz") -> { files: Set<string> }
const usage = new Map();

function recordUsage(namespace, key, file) {
  if (!usage.has(namespace)) usage.set(namespace, new Map());
  const nsMap = usage.get(namespace);
  if (!nsMap.has(key)) nsMap.set(key, { files: new Set() });
  nsMap.get(key).files.add(file);
}

const sourceFiles = walk(SRC_DIR, ['.ts', '.tsx']);

// Regexes for mapping t-identifiers to namespaces
const translationAliasRegex =
  /const\s*{\s*t\s*(?::\s*(\w+))?\s*}\s*=\s*useTranslation\(\s*\{\s*namespace\s*:\s*['"](\w+)['"]\s*\}\s*\)/g;

// Matches calls like: t('toast.xxx', ...?) or tUi('toast.xxx', ...?)
const toastCallRegex = /(\w+)\s*\(\s*['"]toast\.([a-zA-Z0-9_]+)['"]\s*(?:,([^)]*))?\)/g;

for (const file of sourceFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(SRC_DIR, file);

  // 1) Собираем локальное сопоставление идентификаторов t -> namespace
  /** @type {Map<string,string>} */
  const idToNamespace = new Map();

  let aliasMatch;
  while ((aliasMatch = translationAliasRegex.exec(content)) !== null) {
    const alias = aliasMatch[1] || 't';
    const ns = aliasMatch[2];
    idToNamespace.set(alias, ns);
  }

  // 2) Ищем вызовы t('toast.xxx', ...)
  let callMatch;
  while ((callMatch = toastCallRegex.exec(content)) !== null) {
    const fnName = callMatch[1]; // t, tUi, ...
    const suffix = callMatch[2]; // followingAuthor
    const paramsRaw = callMatch[3] || ''; // всё после первой запятой

    let namespace = idToNamespace.get(fnName) || 'ui';

    // 2a) Пытаемся вытащить namespace из второго аргумента:
    // - t('toast.xxx', { ns: 'ui' })
    // - t('toast.xxx', 'ui')
    if (paramsRaw.trim()) {
      // Объект с ns / namespace
      const nsInObjectMatch = paramsRaw.match(/\b(?:ns|namespace)\s*:\s*['"](\w+)['"]/);
      if (nsInObjectMatch) {
        namespace = nsInObjectMatch[1];
      } else {
        // Просто строка 'ui' / "forum"
        const literalMatch = paramsRaw.match(/^\s*['"](\w+)['"]\s*$/);
        if (literalMatch) {
          namespace = literalMatch[1];
        }
      }
    }

    const fullKey = `toast.${suffix}`;
    recordUsage(namespace, fullKey, relPath);
  }
}

// 3) Загружаем локали
const locales = fs
  .readdirSync(LOCALES_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

if (locales.length === 0) {
  console.error('[ERROR] No locales found in src/locales');
  process.exit(1);
}

/** @type {Map<string, Map<string, any>>} */
const localeData = new Map();

for (const locale of locales) {
  const nsMap = new Map();
  const localePath = path.join(LOCALES_DIR, locale);
  const files = fs.readdirSync(localePath);
  for (const file of files) {
    if (!file.endsWith('.json')) continue;
    const ns = path.basename(file, '.json');
    const json = loadJsonSafe(path.join(localePath, file));
    if (json) nsMap.set(ns, json);
  }
  localeData.set(locale, nsMap);
}

// 4) Проверяем наличие ключей во всех локалях
const missing = [];

for (const [namespace, nsMap] of usage.entries()) {
  for (const [fullKey, info] of nsMap.entries()) {
    const [, suffix] = fullKey.split('.', 2);

    for (const locale of locales) {
      const nsForLocale = localeData.get(locale).get(namespace);
      if (!nsForLocale) {
        missing.push({
          locale,
          namespace,
          key: fullKey,
          reason: `missing namespace JSON (${namespace}.json)`,
          files: Array.from(info.files),
        });
        continue;
      }

      const toastObj = nsForLocale.toast;
      const hasKey = toastObj && Object.prototype.hasOwnProperty.call(toastObj, suffix);

      if (!hasKey) {
        missing.push({
          locale,
          namespace,
          key: fullKey,
          reason: 'missing toast key',
          files: Array.from(info.files),
        });
      }
    }
  }
}

if (missing.length === 0) {
  console.log('✅ All toast.* keys used in code are translated for all locales.');
  process.exit(0);
}

console.log('❌ Missing toast translations:');
for (const miss of missing) {
  console.log(
    `- [${miss.locale}] namespace="${miss.namespace}" key="${miss.key}" -> ${miss.reason}; used in: ${miss.files.join(
      ', ',
    )}`,
  );
}

process.exit(1);


