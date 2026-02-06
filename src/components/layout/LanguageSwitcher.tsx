import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useI18n } from '@/context/I18nContext';
import { LANGUAGE_NAMES, type SupportedLanguage } from '@/lib/i18n';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const { language, changeLanguage } = useI18n();
  const { updatePreferences } = useUserPreferences();

  const handleLanguageChange = async (langCode: SupportedLanguage) => {
    await changeLanguage(langCode);
    // Save preference even for non-authenticated users
    await updatePreferences({ language: langCode });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-secondary/50 transition-colors"
          aria-label="Change language"
        >
          <Globe className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {Object.entries(LANGUAGE_NAMES).map(([code, name]) => {
          const isActive = language === code;
          return (
            <DropdownMenuItem
              key={code}
              onClick={() => handleLanguageChange(code as SupportedLanguage)}
              className={cn(
                'flex items-center gap-2 cursor-pointer',
                isActive && 'bg-secondary'
              )}
            >
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span>{name}</span>
              {isActive && (
                <span className="ml-auto text-xs text-muted-foreground">✓</span>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

