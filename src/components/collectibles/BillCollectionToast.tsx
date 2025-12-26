import { useEffect } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { getTranslation } from '@/lib/i18n';
import { useI18n } from '@/context/I18nContext';

interface BillCollectionToastProps {
  billName: string;
  rarity: 'regular' | 'legendary';
  progress?: {
    collected: number;
    total: number;
  };
  show: boolean;
}

export function BillCollectionToast({
  billName,
  rarity,
  progress,
  show,
}: BillCollectionToastProps) {
  const { language } = useI18n();
  
  useEffect(() => {
    if (show) {
      const isLegendary = rarity === 'legendary';
      const t = (key: string) => getTranslation(language, 'ui', key) || key;
      
      toast.success(
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className={`
              flex items-center justify-center w-12 h-12 rounded-lg border-2 font-bold text-lg
              ${isLegendary 
                ? 'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-400 text-amber-900 dark:from-amber-900/30 dark:to-amber-800/30 dark:border-amber-500 dark:text-amber-200'
                : 'bg-gradient-to-br from-green-50 to-green-100 border-green-400 text-green-900 dark:from-green-900/30 dark:to-green-800/30 dark:border-green-500 dark:text-green-200'
              }
            `}
          >
            <div className="text-center leading-tight">
              <div className="text-xs">$</div>
              <div className="text-base">100</div>
            </div>
            {isLegendary && (
              <div className="absolute -top-1 -right-1 text-xs">⭐</div>
            )}
          </motion.div>
          <div className="flex-1">
            <div className="font-semibold text-base">
              {isLegendary ? `🎉 ${t('billCollection.legendaryBillCollected')}` : t('billCollection.billCollected')}
            </div>
            <div className="text-sm text-muted-foreground mt-0.5">
              {billName}
            </div>
            {progress && (
              <div className="text-xs text-muted-foreground mt-1">
                {t('billCollection.progressLabel')} {progress.collected}/{progress.total}
              </div>
            )}
          </div>
        </div>,
        {
          duration: isLegendary ? 5000 : 3000,
          className: isLegendary ? 'border-amber-400/50' : '',
        }
      );
    }
  }, [show, billName, rarity, progress, language]);

  return null; // This component doesn't render anything itself
}

// Helper function to show collection toast
export async function showBillCollectionToast(
  billName: string,
  rarity: 'regular' | 'legendary',
  progress?: { collected: number; total: number }
) {
  const isLegendary = rarity === 'legendary';
  // Get current language from localStorage or default to 'en'
  const language = (localStorage.getItem('language') as any) || 'en';
  const t = (key: string) => getTranslation(language, 'ui', key) || key;
  
  toast.success(
    <div className="flex items-center gap-3">
      <div className={`
        flex items-center justify-center w-12 h-12 rounded-lg border-2 font-bold text-lg
        ${isLegendary 
          ? 'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-400 text-amber-900 dark:from-amber-900/30 dark:to-amber-800/30 dark:border-amber-500 dark:text-amber-200'
          : 'bg-gradient-to-br from-green-50 to-green-100 border-green-400 text-green-900 dark:from-green-900/30 dark:to-green-800/30 dark:border-green-500 dark:text-green-200'
        }
      `}>
        <div className="text-center leading-tight">
          <div className="text-xs">$</div>
          <div className="text-base">100</div>
        </div>
        {isLegendary && (
          <div className="absolute -top-1 -right-1 text-xs">⭐</div>
        )}
      </div>
      <div className="flex-1">
        <div className="font-semibold text-base">
          {isLegendary ? `🎉 ${t('billCollection.legendaryBillCollected')}` : t('billCollection.billCollected')}
        </div>
        <div className="text-sm text-muted-foreground mt-0.5">
          {billName}
        </div>
        {progress && (
          <div className="text-xs text-muted-foreground mt-1">
            {t('billCollection.progressLabel')} {progress.collected}/{progress.total}
          </div>
        )}
      </div>
    </div>,
    {
      duration: isLegendary ? 5000 : 3000,
      className: isLegendary ? 'border-amber-400/50' : '',
    }
  );
}

