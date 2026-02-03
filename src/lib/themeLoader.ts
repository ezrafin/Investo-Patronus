/**
 * Dynamic theme loader
 * Loads additional themes on demand to reduce initial CSS bundle
 */

let themesLoaded = false;

/**
 * Load additional themes CSS file if not already loaded
 * This is called when user selects a theme other than 'dark'
 */
export async function loadThemes(): Promise<void> {
  if (themesLoaded) return;

  try {
    // Dynamic import of themes CSS
    await import('../styles/themes.css');
    themesLoaded = true;
  } catch (error) {
    console.warn('Failed to load themes:', error);
  }
}

/**
 * Check if theme requires loading additional CSS
 */
export function requiresThemeLoad(theme: string): boolean {
  // These themes are in the base CSS
  const baseThemes = ['dark'];
  return !baseThemes.includes(theme);
}

/**
 * Apply theme with dynamic loading if needed
 */
export async function applyTheme(theme: string): Promise<void> {
  const html = document.documentElement;
  
  // All available theme classes
  const ALL_THEMES = ['dark', 'glacier', 'harvest', 'lavender', 'brutalist', 'obsidian', 'orchid', 'solar', 'tide', 'verdant'];
  
  // Remove all theme classes
  ALL_THEMES.forEach(t => html.classList.remove(t));
  
  // Load themes CSS if needed
  if (requiresThemeLoad(theme)) {
    await loadThemes();
  }
  
  // Apply new theme
  html.classList.add(theme);
}
