import { Briefcase, TrendingUp, DollarSign, Shield, Users, BarChart3, Coins, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CompanyServicesProps {
  services: string[];
}

const serviceIcons: Record<string, typeof Briefcase> = {
  'asset': Briefcase,
  'management': Briefcase,
  'investment': TrendingUp,
  'trading': BarChart3,
  'banking': Building2,
  'wealth': Users,
  'risk': Shield,
  'etf': Coins,
  'fund': DollarSign,
  'advisory': Users,
};

function getServiceIcon(service: string) {
  const lowerService = service.toLowerCase();
  for (const [key, Icon] of Object.entries(serviceIcons)) {
    if (lowerService.includes(key)) {
      return Icon;
    }
  }
  return Briefcase;
}

export function CompanyServices({ services }: CompanyServicesProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-heading font-semibold mb-4">Services & Products</h3>
      <div className="grid md:grid-cols-2 gap-3">
        {services.map((service, index) => {
          const Icon = getServiceIcon(service);
          return (
            <div
              key={index}
              className="flex items-start gap-3 p-4 rounded-lg border border-border/60 bg-card hover:border-border hover:bg-secondary/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm text-foreground pt-2">{service}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

