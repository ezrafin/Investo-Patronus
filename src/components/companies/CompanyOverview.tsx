import { CompanyOverview as CompanyOverviewType } from '@/lib/companyOverviews';
import { CompanyServices } from './CompanyServices';
import { CompanyEvents } from './CompanyEvents';
import { Trophy } from 'lucide-react';
import { Building2, TrendingUp, Users, MapPin } from 'lucide-react';

interface CompanyOverviewProps {
  overview: CompanyOverviewType;
}

export function CompanyOverview({ overview }: CompanyOverviewProps) {
  return (
    <div className="space-y-8">
      {/* History */}
      <div>
        <h3 className="text-lg font-heading font-semibold mb-4">Company History</h3>
        <div className="prose prose-sm max-w-none">
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {overview.history}
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      {Object.keys(overview.keyMetrics).length > 0 && (
        <div>
          <h3 className="text-lg font-heading font-semibold mb-4">Key Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {overview.keyMetrics.aum && (
              <div className="p-4 rounded-lg border border-border/60 bg-card">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-xs">Assets Under Management</span>
                </div>
                <p className="text-lg font-heading font-semibold">{overview.keyMetrics.aum}</p>
              </div>
            )}
            {overview.keyMetrics.revenue && (
              <div className="p-4 rounded-lg border border-border/60 bg-card">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Building2 className="h-4 w-4" />
                  <span className="text-xs">Revenue</span>
                </div>
                <p className="text-lg font-heading font-semibold">{overview.keyMetrics.revenue}</p>
              </div>
            )}
            {overview.keyMetrics.clients && (
              <div className="p-4 rounded-lg border border-border/60 bg-card">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Users className="h-4 w-4" />
                  <span className="text-xs">Clients</span>
                </div>
                <p className="text-lg font-heading font-semibold">{overview.keyMetrics.clients}</p>
              </div>
            )}
            {overview.keyMetrics.offices && (
              <div className="p-4 rounded-lg border border-border/60 bg-card">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-xs">Offices</span>
                </div>
                <p className="text-lg font-heading font-semibold">{overview.keyMetrics.offices}</p>
              </div>
            )}
            {overview.keyMetrics.assets && (
              <div className="p-4 rounded-lg border border-border/60 bg-card">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Building2 className="h-4 w-4" />
                  <span className="text-xs">Total Assets</span>
                </div>
                <p className="text-lg font-heading font-semibold">{overview.keyMetrics.assets}</p>
              </div>
            )}
            {overview.keyMetrics.marketCap && (
              <div className="p-4 rounded-lg border border-border/60 bg-card">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-xs">Market Cap</span>
                </div>
                <p className="text-lg font-heading font-semibold">{overview.keyMetrics.marketCap}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Services */}
      {overview.services && overview.services.length > 0 && (
        <CompanyServices services={overview.services} />
      )}

      {/* Competitive Advantages */}
      {overview.competitiveAdvantages && overview.competitiveAdvantages.length > 0 && (
        <div>
          <h3 className="text-lg font-heading font-semibold mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Competitive Advantages
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {overview.competitiveAdvantages.map((advantage, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-lg border border-border/60 bg-card hover:border-primary/50 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Trophy className="h-3.5 w-3.5 text-primary" />
                </div>
                <p className="text-sm text-foreground">{advantage}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Events */}
      {overview.recentEvents && overview.recentEvents.length > 0 && (
        <CompanyEvents events={overview.recentEvents} />
      )}
    </div>
  );
}

