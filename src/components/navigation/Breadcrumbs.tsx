import { Link, useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { generateBreadcrumbs, BreadcrumbItem as BreadcrumbItemType } from '@/utils/breadcrumbs';
import { StructuredData } from '@/components/seo/StructuredData';
import { generateBreadcrumbListSchema } from '@/utils/structuredData';

interface BreadcrumbsProps {
  pageTitle?: string;
  items?: BreadcrumbItemType[];
  className?: string;
}

export function Breadcrumbs({ pageTitle, items, className }: BreadcrumbsProps) {
  const location = useLocation();
  
  // Add try-catch for safety
  let breadcrumbItems: BreadcrumbItemType[];
  try {
    breadcrumbItems = items || generateBreadcrumbs(location.pathname, pageTitle);
  } catch (error) {
    console.error('Breadcrumb generation error:', error);
    breadcrumbItems = [];
  }

  // Generate structured data
  let structuredData;
  try {
    structuredData = generateBreadcrumbListSchema(breadcrumbItems);
  } catch (error) {
    console.error('BreadcrumbList schema generation error:', error);
    structuredData = null;
  }

  if (breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <>
      {structuredData && <StructuredData data={structuredData} />}
      <Breadcrumb className={className}>
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            const path = item.url.replace('https://investopatronus.com', '');

            return (
              <div key={item.url} className="flex items-center">
                {isLast ? (
                  <BreadcrumbPage>{item.name}</BreadcrumbPage>
                ) : (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to={path}>{item.name}</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </>
                )}
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}

