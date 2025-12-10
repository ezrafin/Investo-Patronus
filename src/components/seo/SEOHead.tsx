import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEOData, updateDocumentHead } from '@/utils/seo';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export function SEOHead({
  title,
  description,
  keywords,
  image,
  type,
  author,
  publishedTime,
  modifiedTime,
  noindex,
  nofollow,
}: SEOHeadProps) {
  const location = useLocation();

  useEffect(() => {
    try {
      const fullUrl = `https://investopatronus.com${location.pathname}`;
      
      updateDocumentHead({
        title,
        description,
        keywords,
        image,
        url: fullUrl,
        canonical: fullUrl,
        type: type || 'website',
        author,
        publishedTime,
        modifiedTime,
        noindex,
        nofollow,
      });
    } catch (error) {
      console.error('SEOHead update error:', error);
    }
  }, [
    location.pathname,
    title,
    description,
    keywords,
    image,
    type,
    author,
    publishedTime,
    modifiedTime,
    noindex,
    nofollow,
  ]);

  return null;
}

