import { Calendar, TrendingUp } from 'lucide-react';

interface CompanyEventsProps {
  events: string[];
}

export function CompanyEvents({ events }: CompanyEventsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-heading font-semibold mb-4 flex items-center gap-2">
        <Calendar className="h-5 w-5" />
        Recent Events
      </h3>
      <div className="space-y-3">
        {events.map((event, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 rounded-lg border-l-4 border-primary/50 bg-secondary/30 hover:bg-secondary/50 transition-colors"
          >
            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-foreground leading-relaxed">{event}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

