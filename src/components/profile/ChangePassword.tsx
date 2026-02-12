import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';

export function ChangePassword() {
  const { t } = useTranslation({ namespace: 'ui' });
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      toast.error(t('settings.errorPasswordTooShort'));
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error(t('settings.errorPasswordsMismatch'));
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success(t('settings.passwordChangeSuccess'));
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch {
      toast.error(t('toast.unexpectedError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="premium-card p-6">
      <h2 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
        <Lock className="h-5 w-5" />
        {t('settings.changePassword')}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="newPassword">{t('settings.newPassword')}</Label>
          <Input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
            minLength={8}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">{t('settings.confirmPassword')}</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            minLength={8}
          />
        </div>

        <Button type="submit" disabled={loading || !newPassword || !confirmPassword} variant="outline">
          {loading ? t('settings.changingPassword') : t('settings.changePassword')}
        </Button>
      </form>
    </div>
  );
}
