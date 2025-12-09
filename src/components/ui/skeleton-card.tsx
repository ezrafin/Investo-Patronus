import { cn } from '@/lib/utils';

interface SkeletonCardProps {
  className?: string;
  lines?: number;
}

export function SkeletonCard({ className, lines = 3 }: SkeletonCardProps) {
  return (
    <div className={cn('space-y-4 p-6 rounded-lg bg-card border border-border', className)}>
      <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-3 rounded bg-muted animate-pulse"
          style={{ width: `${100 - i * 15}%` }}
        />
      ))}
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-5 gap-4 py-3 border-b border-border">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-4 rounded bg-muted animate-pulse" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="grid grid-cols-5 gap-4 py-3">
          {Array.from({ length: 5 }).map((_, j) => (
            <div key={j} className="h-4 rounded bg-muted animate-pulse" />
          ))}
        </div>
      ))}
    </div>
  );
}
