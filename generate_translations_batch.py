import json
import time
import requests
from urllib.parse import quote
import os

# Загружаем статьи из английского JSON файла
with open('src/locales/en/analytics.json', 'r', encoding='utf-8') as f:
    en_data = json.load(f)

en_articles = en_data.get('articles', {})

# Извлекаем slug, title, excerpt из JSON
articles = []
seen_slugs = set()

for key, value in en_articles.items():
    if key.endswith('_title'):
        slug = key.replace('_title', '')
        if slug not in seen_slugs:
            seen_slugs.add(slug)
            excerpt_key = f"{slug}_excerpt"
            articles.append({
                'slug': slug,
                'title': value,
                'excerpt': en_articles.get(excerpt_key, '')
            })

print(f"Loaded {len(articles)} articles from English JSON")

# Функция для перевода текста
def translate_text(text, target_lang, source_lang='en', max_retries=3):
    """Переводит текст используя MyMemory API с повторными попытками"""
    for attempt in range(max_retries):
        try:
            # Ограничиваем длину текста для API (максимум ~500 символов)
            text_to_translate = text[:500] if len(text) > 500 else text
            
            url = f"https://api.mymemory.translated.net/get?q={quote(text_to_translate)}&langpair={source_lang}|{target_lang}"
            response = requests.get(url, timeout=15)
            data = response.json()
            
            if data.get('responseStatus') == 200 and data.get('responseData', {}).get('translatedText'):
                translated = data['responseData']['translatedText']
                # Очищаем от HTML entities
                translated = translated.replace('&quot;', '"').replace('&#39;', "'")
                return translated
            else:
                if attempt < max_retries - 1:
                    time.sleep(1)
                    continue
                print(f"    Translation failed after {max_retries} attempts")
                return text
        except Exception as e:
            if attempt < max_retries - 1:
                time.sleep(2)
                continue
            print(f"    Error: {e}")
            return text
    return text

# Функция для загрузки существующих переводов
def load_existing_translations(lang_code):
    filepath = f'src/locales/{lang_code}/analytics.json'
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data.get('articles', {})
    return {}

# Функция для сохранения переводов
def save_translations(lang_code, translations):
    filepath = f'src/locales/{lang_code}/analytics.json'
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    data['articles'] = translations
    
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

# Переводим для каждого языка
languages = [
    ('ru', 'Russian'),
    ('pl', 'Polish'),
    ('de', 'German'),
]

for lang_code, lang_name in languages:
    print(f"\n{'='*60}")
    print(f"Translating to {lang_name} ({lang_code})")
    print(f"{'='*60}")
    
    # Загружаем существующие переводы
    existing = load_existing_translations(lang_code)
    translated_articles = existing.copy()
    
    # Считаем, сколько уже переведено
    translated_count = sum(1 for key in translated_articles.keys() if key.endswith('_title') or key.endswith('_excerpt'))
    print(f"Already translated: {translated_count // 2} articles")
    
    # Переводим только те, которых еще нет
    articles_to_translate = []
    for article in articles:
        title_key = f"{article['slug']}_title"
        excerpt_key = f"{article['slug']}_excerpt"
        
        # Проверяем, нужно ли переводить
        needs_title = title_key not in translated_articles or translated_articles[title_key] == article['title']
        needs_excerpt = excerpt_key not in translated_articles or translated_articles[excerpt_key] == article['excerpt']
        
        if needs_title or needs_excerpt:
            articles_to_translate.append((article, needs_title, needs_excerpt))
    
    print(f"Articles to translate: {len(articles_to_translate)}")
    
    if len(articles_to_translate) == 0:
        print(f"All articles already translated for {lang_name}")
        continue
    
    # Переводим статьи
    for i, (article, needs_title, needs_excerpt) in enumerate(articles_to_translate):
        slug = article['slug']
        print(f"  [{i+1}/{len(articles_to_translate)}] {slug}")
        
        # Переводим title
        if needs_title:
            title_key = f"{slug}_title"
            print(f"    Translating title...")
            translated_title = translate_text(article['title'], lang_code)
            translated_articles[title_key] = translated_title
            time.sleep(0.3)  # Задержка между запросами
        
        # Переводим excerpt
        if needs_excerpt:
            excerpt_key = f"{slug}_excerpt"
            print(f"    Translating excerpt...")
            translated_excerpt = translate_text(article['excerpt'], lang_code)
            translated_articles[excerpt_key] = translated_excerpt
            time.sleep(0.3)  # Задержка между запросами
        
        # Сохраняем каждые 10 статей
        if (i + 1) % 10 == 0:
            save_translations(lang_code, translated_articles)
            print(f"    Progress saved: {i+1}/{len(articles_to_translate)} articles")
    
    # Финальное сохранение
    save_translations(lang_code, translated_articles)
    print(f"\nCompleted translation to {lang_name}")
    print(f"Total translations: {len([k for k in translated_articles.keys() if k.endswith('_title')])} articles")

print("\n" + "="*60)
print("Translation process complete!")
print("="*60)

