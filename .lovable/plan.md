

# Анализ логов и оптимизация скорости сайта INVESTOPATRONUS

## Результаты анализа логов за последний день

### Ошибки и проблемы

**Критических ошибок не обнаружено:**
- База данных: 0 ошибок уровня ERROR/FATAL/PANIC
- Аутентификация: 0 ошибок или неудачных запросов (4xx)
- Edge Functions: 0 HTTP ошибок (status >= 400)
- Консоль браузера: только информационные сообщения Vercel Analytics

**Обнаруженные особенности:**
- `fetch-guardian-news`: среднее время выполнения ~9.8 секунд (одноразовый batch-процесс для загрузки новостей, не влияет на пользователей)
- `fetch-stocks`: работает стабильно, ~380ms в среднем

### Состояние базы данных

| Таблица | Размер | Записей | Примечание |
|---------|--------|---------|------------|
| profiles | 44 MB | 7,716 | ~4.5 KB/запись (большой объём) |
| news_articles | 25 MB | 6,899 | Нормально |
| forum_discussions | 256 KB | 114 | Нормально |

**Обнаружена проблема:** таблица `profiles` занимает 44 MB при 7,716 записях (~4.5 KB на запись) - это избыточно для простых профилей. Возможно, хранятся большие данные в полях `avatar_url` или `bio`.

---

## План оптимизации скорости

### 1. Добавить Service Worker для кэширования статических ресурсов

**Проблема:** Сайт не использует Service Worker для офлайн-кэширования.

**Решение:**
- Создать `public/sw.js` с Workbox-подобной логикой
- Регистрировать SW в `src/main.tsx`
- Кэшировать: шрифты, изображения, JSON переводов, API ответы

**Выигрыш:** Мгновенная загрузка повторных визитов, офлайн-работа

### 2. Оптимизировать загрузку переводов

**Проблема:** В `I18nContext.tsx` загружается 7 namespace-ов параллельно (common, ui, forum, education, analytics, profile, companies), что блокирует рендеринг.

**Решение:**
```typescript
// Загружать только критические namespace-ы для первого рендера
const [common, ui] = await Promise.all([
  loadTranslation(lang, 'common'),
  loadTranslation(lang, 'ui'),
]);

// Остальные загружать в фоне после рендера
Promise.all([
  loadTranslation(lang, 'forum'),
  loadTranslation(lang, 'education'),
  // ...
]).then(setSecondaryTranslations);
```

**Выигрыш:** Ускорение первого рендера на ~200-400ms

### 3. Отложить загрузку рыночных данных

**Проблема:** В `MarketDataSection` используется IntersectionObserver с `rootMargin: '200px'`, но на главной странице секция почти сразу видна.

**Решение:**
- Использовать `staleWhileRevalidate` паттерн с localStorage кэшем (уже частично реализован в `useMarketDataQuery`)
- Показывать кэшированные данные мгновенно
- Увеличить `staleTime` до 60 секунд для менее частого рефреша

### 4. Оптимизировать NewsSection

**Проблема:** `NewsSection` использует `useState` + `useEffect` + `fetchNews()` вместо React Query, что не использует кэширование.

**Решение:**
```typescript
// Заменить на useQuery для использования общего кэша
const { data: news = [], isLoading } = useQuery({
  queryKey: ['news', 'homepage'],
  queryFn: () => fetchNews(),
  staleTime: 2 * 60 * 1000,
});
```

**Выигрыш:** Мгновенный рендер при возврате на главную страницу

### 5. Предзагрузка критических ресурсов

**Уже реализовано в `index.html`:**
- Preload навигационных иконок
- Prefetch основных страниц
- Preconnect к Google Fonts

**Дополнительно добавить:**
```html
<!-- Preload критического CSS для первого экрана -->
<link rel="preload" href="/src/index.css" as="style" />

<!-- Preload hero-фона если используется -->
<link rel="preload" href="/hero-background.jpg" as="image" fetchpriority="high" />
```

### 6. Оптимизировать CSS

**Проблема:** `src/index.css` содержит 1029 строк с 10+ темами (Glacier, Harvest, Lavender, Brutalist, Obsidian, Orchid, Solar, Tide, Verdant), большинство из которых редко используются.

**Решение:**
- Вынести дополнительные темы в отдельный файл `themes.css`
- Загружать темы динамически при выборе пользователем
- Основной CSS уменьшится на ~60%

### 7. Сжатие изображений

**Рекомендации:**
- Конвертировать все изображения в WebP формат (уже поддерживается в `LazyImage`)
- Добавить AVIF как ещё более современный формат
- Оптимизировать `hero-background.jpg` и `bg.mp4`

---

## Технический план реализации

### Файлы для создания:
1. `public/sw.js` - Service Worker
2. `src/lib/registerSW.ts` - регистрация SW

### Файлы для изменения:
1. `src/main.tsx` - добавить регистрацию SW
2. `src/context/I18nContext.tsx` - отложенная загрузка переводов
3. `src/components/home/NewsSection.tsx` - миграция на useQuery
4. `src/index.css` - вынести темы
5. `index.html` - добавить preload критических ресурсов

### Порядок выполнения:
1. NewsSection → useQuery (быстрая победа)
2. I18nContext оптимизация (заметное улучшение)
3. Service Worker (долгосрочный эффект)
4. CSS разделение (уменьшение bundle)

---

## Метрики улучшения (ожидаемые)

| Метрика | Текущее | После оптимизации |
|---------|---------|-------------------|
| First Contentful Paint | ~1.5s | ~1.0s |
| Largest Contentful Paint | ~2.5s | ~1.8s |
| Повторный визит | ~1.2s | ~0.3s (SW cache) |
| Bundle Size (CSS) | ~45KB | ~18KB |

