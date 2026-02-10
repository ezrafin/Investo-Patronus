

# Деактивация кнопок Google и Apple OAuth с тултипом "Coming soon..."

## Что будет сделано

На страницах входа и регистрации кнопки "Continue with Google" и "Continue with Apple" станут неактивными (disabled). При наведении курсора на кнопку будет показываться тултип с текстом "Coming soon..." на текущем языке.

## Изменения

### 1. Добавить перевод `auth.comingSoon` во все 7 языковых файлов

| Язык | Текст |
|------|-------|
| en | Coming soon... |
| ru | Скоро... |
| de | Demnachst... |
| es | Proximamente... |
| fr | Bientot... |
| pl | Wkrotce... |
| zh | 即将推出... |

### 2. Обновить `LoginPage.tsx`

- Обернуть обе OAuth кнопки в `<Tooltip>` (уже есть в проекте из `@radix-ui/react-tooltip`)
- Установить `disabled` на обе кнопки (без привязки к `loading`)
- Убрать `onClick` обработчики

### 3. Обновить `RegisterPage.tsx`

- Аналогичные изменения: обернуть в `<Tooltip>`, сделать `disabled`, убрать `onClick`

## Файлы для изменения

| Файл | Изменение |
|------|-----------|
| `src/locales/en/ui.json` | Добавить `auth.comingSoon` |
| `src/locales/ru/ui.json` | Добавить `auth.comingSoon` |
| `src/locales/de/ui.json` | Добавить `auth.comingSoon` |
| `src/locales/es/ui.json` | Добавить `auth.comingSoon` |
| `src/locales/fr/ui.json` | Добавить `auth.comingSoon` |
| `src/locales/pl/ui.json` | Добавить `auth.comingSoon` |
| `src/locales/zh/ui.json` | Добавить `auth.comingSoon` |
| `src/pages/auth/LoginPage.tsx` | Disabled кнопки + Tooltip |
| `src/pages/auth/RegisterPage.tsx` | Disabled кнопки + Tooltip |

