import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Mail, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';
export default function ContactPage() {
  const { t } = useTranslation({ namespace: 'ui' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success(t('contactPage.toastSuccess'));
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
  };
  return <Layout>
      <div className="pt-24 pb-16">
        <section className="container-wide section-spacing-sm">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="badge-primary mb-4">{t('contactPage.badge')}</span>
            <h1 className="heading-xl mb-6">{t('contactPage.heroTitle')}</h1>
            <p className="body-xl">
              {t('contactPage.heroSubtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t('contactPage.emailTitle')}</h3>
                    <p className="text-sm text-muted-foreground">{t('contactPage.emailSupport')}</p>
                    <p className="text-sm text-muted-foreground">{t('contactPage.emailPress')}</p>
                  </div>
                </div>
              </div>

              

              <div className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t('contactPage.officeTitle')}</h3>
                    <p className="text-sm text-muted-foreground">{t('contactPage.officeLine1')}</p>
                    <p className="text-sm text-muted-foreground">{t('contactPage.officeLine2')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="glass-card p-8">
                <h2 className="heading-sm mb-6">{t('contactPage.formTitle')}</h2>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t('contactPage.labelName')}</label>
                    <Input value={formData.name} onChange={e => setFormData({
                    ...formData,
                    name: e.target.value
                  })} placeholder={t('contactPage.placeholderName')} required />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t('contactPage.labelEmail')}</label>
                    <Input type="email" value={formData.email} onChange={e => setFormData({
                    ...formData,
                    email: e.target.value
                  })} placeholder={t('contactPage.placeholderEmail')} required />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">{t('contactPage.labelSubject')}</label>
                  <Input value={formData.subject} onChange={e => setFormData({
                  ...formData,
                  subject: e.target.value
                })} placeholder={t('contactPage.placeholderSubject')} required />
                </div>
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">{t('contactPage.labelMessage')}</label>
                  <Textarea value={formData.message} onChange={e => setFormData({
                  ...formData,
                  message: e.target.value
                })} placeholder={t('contactPage.placeholderMessage')} rows={6} required />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  <Send className="h-4 w-4 mr-2" />
                  {isSubmitting ? t('contactPage.buttonSending') : t('contactPage.buttonSend')}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </Layout>;
}