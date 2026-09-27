import { cn } from './Card';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'safe' | 'warn' | 'crit' | 'info' | 'sys' | 'neutral' | 'active';
  className?: string;
  dot?: boolean;
}

export function Badge({ children, variant = 'neutral', className, dot = false }: BadgeProps) {
  const variants = {
    safe: 'bg-dash-safe/10 text-dash-safe border border-dash-safe/20',
    warn: 'bg-dash-warn/10 text-dash-warn border border-dash-warn/20',
    crit: 'bg-dash-crit/10 text-dash-crit border border-dash-crit/20',
    info: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    sys: 'bg-gray-700/30 text-gray-400 border border-gray-700/50',
    neutral: 'bg-gray-800 text-gray-300 border border-gray-700',
    active: 'bg-dash-accent/10 text-dash-accent border border-dash-accent/20',
  };

  const dotColors = {
    safe: 'bg-dash-safe',
    warn: 'bg-dash-warn',
    crit: 'bg-dash-crit',
    info: 'bg-blue-400',
    sys: 'bg-gray-400',
    neutral: 'bg-gray-500',
    active: 'bg-dash-accent',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium uppercase tracking-wider',
        variants[variant],
        className
      )}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          {variant !== 'neutral' && variant !== 'sys' && (
             <span className={cn('animate-ping absolute inline-flex h-full w-full rounded-full opacity-75', dotColors[variant])}></span>
          )}
          <span className={cn('relative inline-flex rounded-full h-1.5 w-1.5', dotColors[variant])}></span>
        </span>
      )}
      {children}
    </span>
  );
}
