

# Исправление входа через Google и Apple OAuth

## Диагностика проблемы

Из скриншотов видно:

1. **Ошибка**: `oauth.lovable.app/callback` возвращает 400 "Missing state parameter"
2. **Google Console**: Redirect URI настроен как `https://investo-patronus.lovable.app/~oauth/callback`
3. **Фактический callback**: Браузер попадает на `https://oauth.lovable.app/callback` (другой URL!)

### Как работает Lovable Cloud OAuth

Библиотека `@lovable.dev/cloud-auth-js` работает так:
1. Открывает `investo-patronus.lovable.app/~oauth/initiate` (брокер)
2. Брокер перенаправляет на Google
3. Google перенаправляет на callback URL (настроенный в Google Console)
4. Callback обрабатывает токены и перенаправляет пользователя на `redirect_uri`

**Проблема**: Брокер Lovable использует `oauth.lovable.app/callback` как внутренний callback, но в Google Console указан `investo-patronus.lovable.app/~oauth/callback`. Из-за несоответствия теряется параметр `state`.

## Решение

### Шаг 1: Исправить код — убрать `/auth/callback` из `redirect_uri`

Согласно документации библиотеки, `redirect_uri` должен быть просто `window.location.origin` (без пути). Библиотека сама обрабатывает callback через брокер и возвращает пользователя на указанный origin.

**Файл: `src/hooks/useAuth.ts`**

Текущий код (строка 344):
```typescript
const redirectUri = `${currentOrigin}/auth/callback`;
```

Исправить на:
```typescript
const redirectUri = currentOrigin;
```

### Шаг 2: Обновить Authorized redirect URIs в Google Console

В Google Console нужно **добавить** URL:
```
https://oauth.lovable.app/callback
```

Это внутренний callback Lovable OAuth брокера, который используется для обработки ответа Google. Текущий `https://investo-patronus.lovable.app/~oauth/callback` может быть удалён или оставлен.

### Шаг 3: Проверить Apple Sign-In

Apple использует тот же Lovable Cloud OAuth брокер. Если Apple Sign-In управляется Lovable (managed), дополнительная настройка не требуется — он будет работать после исправления кода в шаге 1.

---

## Файлы для изменения

| Файл | Изменение |
|------|-----------|
| `src/hooks/useAuth.ts` | Убрать `/auth/callback` из `redirect_uri` для OAuth — использовать просто `window.location.origin` |

## Действия пользователя (вне кода)

В Google Cloud Console добавить в "Authorized redirect URIs":
```
https://oauth.lovable.app/callback
```

## Ожидаемый результат

1. При нажатии "Continue with Google" пользователь перенаправляется на Google
2. После авторизации Google перенаправляет на `oauth.lovable.app/callback`
3. Брокер обрабатывает токены и перенаправляет на `investopatronus.com`
4. Пользователь залогинен на сайте
