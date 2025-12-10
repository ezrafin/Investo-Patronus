import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEOData, updateDocumentHead } from '@/utils/seo';

export function useSEO(data: SEOData) {
  const location = useLocation();

  useEffect(() => {
    // Update canonical URL with current path
    const fullUrl = `https://investopatronus.com${location.pathname}`;
    updateDocumentHead({
      ...data,
      url: fullUrl,
      canonical: fullUrl,
    });
  }, [location.pathname, data]);
}

