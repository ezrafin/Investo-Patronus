import { useEffect } from 'react';

interface StructuredDataProps {
  data: object | object[];
}

export function StructuredData({ data }: StructuredDataProps) {
  useEffect(() => {
    const scriptId = 'structured-data';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const jsonData = Array.isArray(data) ? data : [data];
    script.textContent = JSON.stringify(jsonData);
  }, [data]);

  return null;
}

