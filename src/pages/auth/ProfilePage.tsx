import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUser } from '@/context/UserContext';
import { toast } from 'sonner';
import { Save, User, Shield, TrendingUp, MessageSquare, BookOpen, Trophy, Camera, Mail, Bell, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AchievementList } from '@/components/forum/AchievementList';
import { ReputationBadge } from '@/components/forum/ReputationBadge';
import { AvatarSelector } from '@/components/user/AvatarSelector';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { usePageBillCollection } from '@/hooks/usePageBillCollection';
import { useTranslation } from '@/hooks/useTranslation';
import { useUnreadNotificationCount } from '@/hooks/useNotifications';
import { MyDiscussions } from '@/components/profile/MyDiscussions';
import { MyReplies } from '@/components/profile/MyReplies';
import { MyBookmarks } from '@/components/profile/MyBookmarks';
import { ChangePassword } from '@/components/profile/ChangePassword';
import { NotificationsPanel } from '@/components/profile/NotificationsPanel';

export default function ProfilePage() {
  const { CoinComponent } = usePageBillCollection({ billId: 'profile_own_visit' });
  const { user, profile, loading: authLoading, updateProfile } = useUser();
  const { t } = useTranslation({ namespace: 'ui' });
  const { data: unreadCount } = useUnreadNotificationCount();
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [privacyLevel, setPrivacyLevel] = useState<'public' | 'private' | 'friends'>('public');
  const [saving, setSaving] = useState(false);
  const [avatarSelectorOpen, setAvatarSelectorOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [changingEmail, setChangingEmail] = useState(false);

  useEffect(() => {
    if (authLoading) {
      const timeout = setTimeout(() => setLoadingTimeout(true), 10000);
      return () => clearTimeout(timeout);
    }
  }, [authLoading]);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || '');
      setBio(profile.bio || '');
      setPrivacyLevel(profile.privacy_level);
      setAvatarUrl(profile.avatar_url || null);
    }
  }, [profile]);

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (authLoading && !loadingTimeout) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading profile...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (loadingTimeout && !user) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Session expired</h1>
            <p className="text-muted-foreground mb-6">Please sign in again.</p>
            <Link to="/auth/login"><Button>Sign in</Button></Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Please sign in</h1>
            <p className="text-muted-foreground mb-6">You need to be signed in to view your profile.</p>
            <Link to="/auth/login"><Button>Sign in</Button></Link>
          </div>
        </div>
      </Layout>
    );
  }

  const handleAvatarSelect = async (url: string) => {
    setAvatarUrl(url);
    const { error } = await updateProfile({ avatar_url: url });
    if (error) toast.error(t('toast.failedToUpdateAvatar'));
    else toast.success(t('toast.avatarUpdatedSuccess'));
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await updateProfile({
      display_name: displayName,
      bio: bio,
      privacy_level: privacyLevel,
    });
    if (error) toast.error(t('toast.failedToUpdateProfile'));
    else toast.success(t('toast.profileUpdatedSuccess'));
    setSaving(false);
  };

  const handleEmailChange = async () => {
    if (!newEmail || newEmail === user.email) {
      toast.error(t('toast.pleaseEnterDifferentEmail'));
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      toast.error(t('toast.pleaseEnterValidEmail'));
      return;
    }
    setChangingEmail(true);
    try {
      const { error } = await supabase.auth.updateUser({ email: newEmail });
      if (error) toast.error(error.message || t('errors.failedToUpdate'));
      else {
        toast.success(t('toast.confirmationEmailSent'));
        setNewEmail('');
      }
    } catch {
      toast.error(t('toast.unexpectedError'));
    } finally {
      setChangingEmail(false);
    }
  };

  return (
    <Layout>
      <div className="section-spacing">
        <div className="container-wide max-w-4xl">
          <h1 className="heading-lg mb-8">{t('profilePage.title')}</h1>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Sidebar Stats */}
            <div className="space-y-6">
              <div className="premium-card p-6">
                <div className="flex flex-col items-center gap-4 mb-6">
                  <button onClick={() => setAvatarSelectorOpen(true)} className="relative group cursor-pointer">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={avatarUrl || undefined} alt={displayName || 'User'} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xl">
                        {getInitials(displayName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Camera className="h-6 w-6 text-white" />
                    </div>
                  </button>
                  <div className="text-center">
                    <h3 className="font-semibold">{profile?.display_name || 'User'}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{t('profilePage.clickAvatarToChange')}</p>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <TrendingUp className="h-4 w-4" />
                      <span>{t('profilePage.reputation')}</span>
                    </div>
                    <span className="font-semibold">{profile?.reputation || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MessageSquare className="h-4 w-4" />
                      <span>{t('profilePage.posts')}</span>
                    </div>
                    <span className="font-semibold">{profile?.post_count || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BookOpen className="h-4 w-4" />
                      <span>{t('profilePage.comments')}</span>
                    </div>
                    <span className="font-semibold">{profile?.comment_count || 0}</span>
                  </div>
                  <div className="pt-2">
                    <ReputationBadge profile={profile} size="sm" />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content with Tabs */}
            <div className="md:col-span-2">
              <Tabs defaultValue="settings" className="w-full">
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="settings" className="flex-1">
                    <User className="h-4 w-4 mr-1.5" />
                    {t('profilePage.tabSettings')}
                  </TabsTrigger>
                  <TabsTrigger value="content" className="flex-1">
                    <FileText className="h-4 w-4 mr-1.5" />
                    {t('profilePage.tabContent')}
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="flex-1 relative">
                    <Bell className="h-4 w-4 mr-1.5" />
                    {t('profilePage.tabNotifications')}
                    {unreadCount && unreadCount > 0 ? (
                      <span className="ml-1.5 inline-flex items-center justify-center h-5 min-w-[20px] px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                        {unreadCount > 99 ? '99+' : unreadCount}
                      </span>
                    ) : null}
                  </TabsTrigger>
                </TabsList>

                {/* Settings Tab */}
                <TabsContent value="settings" className="space-y-6">
                  {/* Basic Info */}
                  <div className="premium-card p-6">
                    <h2 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
                      <User className="h-5 w-5" />
                      {t('profilePage.basicInformation')}
                    </h2>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="displayName">Display Name</Label>
                        <Input id="displayName" type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder={t('labels.displayNamePlaceholder')} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">{t('labels.bio')}</Label>
                        <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder={t('labels.bioPlaceholder')} rows={4} />
                      </div>
                    </div>
                  </div>

                  {/* Email Settings */}
                  <div className="premium-card p-6">
                    <h2 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      {t('profilePage.emailSettings')}
                    </h2>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentEmail">{t('profilePage.currentEmail')}</Label>
                        <Input id="currentEmail" type="email" value={user.email || ''} disabled className="bg-muted" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newEmail">{t('profilePage.newEmailAddress')}</Label>
                        <Input id="newEmail" type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder={t('auth.emailPlaceholderExample')} />
                        <p className="text-xs text-muted-foreground">{t('profilePage.emailChangeNote')}</p>
                      </div>
                      <Button onClick={handleEmailChange} disabled={changingEmail || !newEmail} variant="outline">
                        {changingEmail ? t('profilePage.sendingConfirmation') : t('profilePage.changeEmail')}
                      </Button>
                    </div>
                  </div>

                  {/* Change Password */}
                  <ChangePassword />

                  {/* Privacy Settings */}
                  <div className="premium-card p-6">
                    <h2 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      {t('profilePage.privacySettings')}
                    </h2>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="privacy">{t('profilePage.profileVisibility')}</Label>
                        <Select value={privacyLevel} onValueChange={(value: 'public' | 'private' | 'friends') => setPrivacyLevel(value)}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">{t('profilePage.visibilityPublic')}</SelectItem>
                            <SelectItem value="friends">{t('profilePage.visibilityFriends')}</SelectItem>
                            <SelectItem value="private">{t('profilePage.visibilityPrivate')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleSave} disabled={saving} className="w-full md:w-auto">
                    <Save className="mr-2 h-4 w-4" />
                    {saving ? t('profilePage.saving') : t('profilePage.saveChanges')}
                  </Button>
                </TabsContent>

                {/* Content Tab */}
                <TabsContent value="content">
                  <Tabs defaultValue="discussions" className="w-full">
                    <TabsList className="w-full mb-4">
                      <TabsTrigger value="discussions" className="flex-1">{t('profilePage.myDiscussions')}</TabsTrigger>
                      <TabsTrigger value="replies" className="flex-1">{t('profilePage.myReplies')}</TabsTrigger>
                      <TabsTrigger value="bookmarks" className="flex-1">{t('profilePage.myBookmarks')}</TabsTrigger>
                    </TabsList>
                    <TabsContent value="discussions"><MyDiscussions /></TabsContent>
                    <TabsContent value="replies"><MyReplies /></TabsContent>
                    <TabsContent value="bookmarks"><MyBookmarks /></TabsContent>
                  </Tabs>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications">
                  <NotificationsPanel />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Achievements */}
          <div className="mt-8 premium-card p-6">
            <h2 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              {t('achievements.title')}
            </h2>
            <AchievementList />
          </div>
        </div>
      </div>

      <AvatarSelector
        open={avatarSelectorOpen}
        onOpenChange={setAvatarSelectorOpen}
        currentAvatar={avatarUrl}
        onSelect={handleAvatarSelect}
        userId={user.id}
      />
      {CoinComponent && <CoinComponent />}
    </Layout>
  );
}
