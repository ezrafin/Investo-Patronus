
# План исправления двух проблем

## Проблема 1: Ошибка 404 при входе через Google/Apple

### Диагностика
Из скриншота видно, что при OAuth-входе происходит редирект на URL:
```
investopatronus.com/~oauth/initiate?provider=google&redirect_uri=https%3A%2F%2Fwww.investopatronus.com%2Fauth%2Fcallback...
```

Этот URL (`/~oauth/initiate`) — это endpoint Lovable Cloud OAuth, но в нём указан `redirect_uri` с `www.investopatronus.com`, что может вызывать несоответствие доменов.

**Ключевая причина**: Redirect URI отправляется как `window.location.origin`, но в данном случае это может быть `www.investopatronus.com`, тогда как OAuth настроен для `investopatronus.com` (без www). Также нужно указывать полный путь `/auth/callback`, а не просто origin.

### Решение

1. **Изменить `src/hooks/useAuth.ts`**:
   - Для `redirect_uri` использовать полный путь `${window.location.origin}/auth/callback`
   - Убедиться что домен соответствует настройкам OAuth провайдера

```typescript
const result = await lovable.auth.signInWithOAuth(provider, {
  redirect_uri: `${window.location.origin}/auth/callback`,
});
```

---

## Проблема 2: Фиатные валюты показывают 0.00% изменения

### Диагностика

Из логов Edge Function видно:
```
Returning 10 items from source: exchangerate for type: currencies
```

Функция `fetchExchangeRateAPI()` возвращает данные, но **не вычисляет изменение цены**. Это бесплатный API который даёт только текущие курсы без исторических данных:

```typescript
// Строки 1087-1095 в fetch-stocks/index.ts
return {
  symbol: formatSymbol(item.symbol, 'currencies'),
  name: item.name,
  price,
  change: 0,           // ← Всегда 0!
  changePercent: 0,    // ← Всегда 0!
  high: price,
  low: price,
};
```

**Проблема**: API с ключами (которые вычисляют daily change) возвращают недостаточно данных и система падает на бесплатный API ExchangeRate-API, который не предоставляет исторические данные.

Логи показывают цепочку fallback:
```
Finnhub API failed → Twelve Data API failed → Yahoo Finance API failed →
Open Exchange Rates failed → CurrencyFreaks failed → ExchangeRate-API ✓ (0% change)
```

### Решение

Модифицировать `fetchExchangeRateAPI()` для получения предыдущего дня данных, аналогично тому, как это сделано в `fetchOpenExchangeRates()` и `fetchCurrencyFreaks()`.

ExchangeRate-API поддерживает бесплатный исторический endpoint:
`https://api.exchangerate-api.com/v4/<date>/USD`

Пример исправления:

```typescript
async function fetchExchangeRateAPI(): Promise<any[]> {
  try {
    // Fetch latest rates
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    if (!response.ok) throw new Error(`ExchangeRate-API error: ${response.status}`);
    const data = await response.json();
    const rates = data.rates || {};
    
    // Fetch previous day rates for change calculation
    const yesterday = new Date();
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    const y = yesterday.getUTCFullYear();
    const m = String(yesterday.getUTCMonth() + 1).padStart(2, '0');
    const d = String(yesterday.getUTCDate()).padStart(2, '0');
    const prevDate = `${y}-${m}-${d}`;
    
    let prevRates: Record<string, number> = {};
    try {
      const prevResp = await fetch(`https://api.exchangerate-api.com/v4/${prevDate}/USD`);
      if (prevResp.ok) {
        const prevData = await prevResp.json();
        prevRates = prevData.rates || {};
      }
    } catch (e) {
      console.warn('ExchangeRate-API historical fetch failed:', e);
    }
    
    return CURRENCY_SYMBOLS.map((item) => {
      // ... calculate price and prevPrice
      const change = price - prevPrice;
      const changePercent = prevPrice !== 0 ? (change / prevPrice) * 100 : 0;
      
      return {
        symbol: formatSymbol(item.symbol, 'currencies'),
        name: item.name,
        price,
        change,
        changePercent,
        high: Math.max(price, prevPrice),
        low: Math.min(price, prevPrice),
      };
    }).filter(Boolean);
  } catch (error) {
    console.error('ExchangeRate-API error:', error);
    return [];
  }
}
```

Аналогичные изменения нужны для `fetchExchangeRateHost()` и `fetchFixerIO()`.

---

## Файлы для изменения

| Файл | Изменение |
|------|-----------|
| `src/hooks/useAuth.ts` | Исправить `redirect_uri` для OAuth |
| `supabase/functions/fetch-stocks/index.ts` | Добавить вычисление daily change в функциях `fetchExchangeRateAPI()`, `fetchExchangeRateHost()`, `fetchFixerIO()`, `fetchFrankfurter()` |

---

## Ожидаемый результат

1. **OAuth**: Вход через Google и Apple будет корректно перенаправлять на `/auth/callback` после авторизации

2. **Валюты**: Процент изменения будет вычисляться как разница между сегодняшним и вчерашним курсом, например:
   - EUR/USD: 0.8480 → **~0.15%** (вместо 0.00%)
   - USD/JPY: 154.85 → **~0.35%** (вместо 0.00%)
