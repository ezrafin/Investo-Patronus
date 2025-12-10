import { useEffect, useId } from 'react';

interface StructuredDataProps {
  data: object | object[];
}

export function StructuredData({ data }: StructuredDataProps) {
  const uniqueId = useId().replace(/:/g, '-');
  const scriptId = `structured-data-${uniqueId}`;

  useEffect(() => {
    try {
      let script = document.getElementById(scriptId) as HTMLScriptElement;

      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }

      const jsonData = Array.isArray(data) ? data : [data];
      script.textContent = JSON.stringify(jsonData);
    } catch (error) {
      console.error('StructuredData error:', error);
    }
  }, [data, scriptId]);

  return null;
}

