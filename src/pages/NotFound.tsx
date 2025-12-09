import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="section-spacing">
        <div className="container-narrow text-center">
          <h1 className="heading-xl mb-4">404</h1>
          <p className="body-lg mb-8">Page not found</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to homepage
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;