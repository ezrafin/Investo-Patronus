import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { ArrowLeft, TrendingUp, Newspaper, BarChart3, Search } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { SEOHead } from "@/components/seo/SEOHead";
import { logger } from "@/lib/logger";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation({ namespace: "ui" });

  useEffect(() => {
    logger.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const quickLinks = [
    { to: "/markets/indices", icon: TrendingUp, label: t("navigation.markets") },
    { to: "/news", icon: Newspaper, label: t("navigation.news") },
    { to: "/analytics", icon: BarChart3, label: t("navigation.analytics") },
  ];

  return (
    <Layout>
      <SEOHead
        title="Page Not Found - 404"
        description="The page you're looking for doesn't exist. Return to INVESTOPATRONUS homepage to explore financial markets, news, analytics, and educational resources."
        noindex={true}
      />
      <div className="section-spacing">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-8xl font-bold text-primary/20 mb-4 font-heading">404</div>
            <h1 className="heading-lg mb-4">{t("notFound.message")}</h1>
            <p className="body-lg text-muted-foreground mb-8">
              {t("notFound.subtitle")}
            </p>

            {/* Quick Links */}
            <div className="grid sm:grid-cols-3 gap-4 max-w-lg mx-auto mb-10">
              {quickLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="glass-card-hover p-4 flex flex-col items-center gap-2 text-sm"
                >
                  <link.icon className="h-5 w-5 text-primary" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("notFound.backHome")}
            </Link>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
