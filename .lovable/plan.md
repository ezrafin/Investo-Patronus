

# Исправление OAuth и других ошибок

## Проблема 1: "redirect_uri is not allowed" (Google и Apple)

### Диагностика

Ошибка происходит **не на стороне Google**, а на стороне **Lovable OAuth брокера** (`oauth.lovable.app`). Брокер получает `redirect_uri=https://investopatronus.com` и отвечает "redirect_uri is not allowed", потому что кастомный домен не зарегистрирован как разрешённый для OAuth редиректов.

Код приложения **корректный** — `redirect_uri` правильно формируется как `window.location.origin` (без `/auth/callback`). Настройки Google Console тоже верные.

### Решение (действия пользователя, не код)

**Шаг 1**: Убедитесь что кастомный домен `investopatronus.com` правильно подключён в настройках проекта Lovable:
- Зайдите в **Settings** -> **Domains** в проекте Lovable
- Проверьте что `investopatronus.com` имеет статус **Active**
- Если домен в статусе "Verifying", "Offline" или другом — нужно исправить DNS записи

**Шаг 2**: Если домен Active, но OAuth всё равно не работает — **переподключите домен**:
- Удалите домен из настроек
- Добавьте заново `investopatronus.com`
- Дождитесь статуса Active

**Шаг 3**: Убедитесь что `investopatronus.com` установлен как **Primary** домен (а не `www.investopatronus.com`).

**Шаг 4**: Также добавьте `www.investopatronus.com` как отдельный домен, чтобы он редиректил на Primary.

### Изменения в коде

Код менять **не нужно** — текущая реализация корректна. Файл `src/hooks/useAuth.ts` правильно использует:
```typescript
const currentOrigin = window.location.origin.replace('www.', '');
const result = await lovable.auth.signInWithOAuth(provider, {
  redirect_uri: currentOrigin,
});
```

Файл `src/integrations/lovable/index.ts` корректно настроен с `oauthBrokerUrl`.

---

## Проблема 2: Ошибки Edge Functions (fetch-stocks)

### Диагностика из логов

Обнаружены следующие ошибки в логах:

| API | Ошибка | Причина |
|-----|--------|---------|
| Yahoo Finance | 401 Unauthorized | Недействительный или отсутствующий API ключ |
| Open Exchange Rates | 429 Too Many Requests | Превышен лимит бесплатного тарифа |
| CurrencyFreaks | 429 Too Many Requests | Превышен лимит бесплатного тарифа |

Цепочка fallback работает корректно — система падает на бесплатный ExchangeRate-API, который отдаёт данные. Но из-за частых вызовов платные API возвращают 429.

### Рекомендации

1. **Yahoo Finance API ключ** — проверить что ключ `YAHOO_FINANCE_API_KEY` валиден и не истёк
2. **Кеширование** — увеличить интервал кеширования для валют (они обновляются редко, достаточно раз в час)
3. **Rate limit backoff** — добавить экспоненциальный backoff при 429 ошибках чтобы не тратить оставшийся лимит

Эти ошибки **не критичны** — сайт работает благодаря fallback на бесплатные API. Но для стабильности стоит решить.

---

## Итого

| Проблема | Тип | Действие |
|----------|-----|----------|
| OAuth "redirect_uri not allowed" | Конфигурация проекта | Переподключить кастомный домен в Settings -> Domains |
| Yahoo Finance 401 | API ключ | Проверить/обновить YAHOO_FINANCE_API_KEY |
| CurrencyFreaks/OER 429 | Rate limiting | Некритично, работает fallback |

