import { Layout } from '@/components/layout/Layout';

export default function PrivacyPage() {
  return (
    <Layout>
      <div className="pt-24 pb-16">
        <section className="container-narrow section-spacing-sm">
          <div className="text-center mb-12">
            <span className="badge-primary mb-4">Legal</span>
            <h1 className="heading-xl mb-6">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground">Last updated: December 1, 2024</p>
          </div>

          <div className="space-y-8">
            <div className="glass-card p-8">
              <h2 className="heading-sm mb-4">1. Information We Collect</h2>
              <p className="body-md mb-4">We collect information you provide directly to us, including:</p>
              <ul className="list-disc pl-6 space-y-2 body-md">
                <li>Name and email address when you subscribe to our newsletter</li>
                <li>Contact information when you reach out to us</li>
                <li>Usage data and analytics about how you interact with our platform</li>
                <li>Device information and IP addresses for security purposes</li>
              </ul>
            </div>

            <div className="glass-card p-8">
              <h2 className="heading-sm mb-4">2. How We Use Your Information</h2>
              <p className="body-md mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2 body-md">
                <li>Provide, maintain, and improve our services</li>
                <li>Send you newsletters and marketing communications (with your consent)</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, investigate, and prevent security incidents</li>
              </ul>
            </div>

            <div className="glass-card p-8">
              <h2 className="heading-sm mb-4">3. Information Sharing</h2>
              <p className="body-md">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law. We may share information with service providers who assist in operating our platform.
              </p>
            </div>

            <div className="glass-card p-8">
              <h2 className="heading-sm mb-4">4. Data Security</h2>
              <p className="body-md">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </div>

            <div className="glass-card p-8">
              <h2 className="heading-sm mb-4">5. Cookies and Tracking</h2>
              <p className="body-md">
                We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </div>

            <div className="glass-card p-8">
              <h2 className="heading-sm mb-4">6. Your Rights</h2>
              <p className="body-md mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 body-md">
                <li>Access and receive a copy of your personal data</li>
                <li>Rectify inaccurate or incomplete data</li>
                <li>Request deletion of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </div>

            <div className="glass-card p-8">
              <h2 className="heading-sm mb-4">7. Contact Us</h2>
              <p className="body-md">
                If you have any questions about this Privacy Policy, please contact us at privacy@investopatronus.com.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
