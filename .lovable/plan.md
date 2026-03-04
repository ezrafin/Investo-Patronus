

# Enable Google & Apple OAuth Buttons

The backend logic (`useAuth.ts`) already correctly uses `lovable.auth.signInWithOAuth()` for Google and Apple. The buttons are simply disabled with `pointer-events-none` and `disabled` props, wrapped in "Coming soon" tooltips.

## Changes

### 1. `src/pages/auth/LoginPage.tsx` (lines 130-166)
- Remove `<TooltipProvider>`, `<Tooltip>`, `<TooltipTrigger>`, `<TooltipContent>` wrappers
- Remove `disabled` and `pointer-events-none` from both buttons
- Add `onClick={handleGoogleLogin}` and `onClick={handleAppleLogin}`
- Add `disabled={loading}` for loading state only

### 2. `src/pages/auth/RegisterPage.tsx` (lines ~220-255)
- Same changes: remove tooltip wrappers, enable buttons
- Wire `onClick={handleGoogleSignup}` and `onClick={handleAppleSignup}`
- Add `disabled={loading}`

### 3. `src/locales/*/ui.json` (7 files)
- Remove `auth.comingSoon` key (no longer needed)

No backend or database changes required -- the Lovable Cloud managed OAuth is already configured.

