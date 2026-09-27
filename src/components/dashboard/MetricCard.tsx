import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import type {  LucideIcon  } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: LucideIcon;
  status?: 'SAFE' | 'WARNING' | 'CRITICAL';
  trend?: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

export function MetricCard({ title, value, unit, icon: Icon, status = 'SAFE', trend = 'stable', lastUpdated }: MetricCardProps) {
    const getBadgeVariant = () => {
    switch (status) {
      case 'SAFE': return 'safe';
      case 'WARNING': return 'warn';
      case 'CRITICAL': return 'crit';
      default: return 'neutral';
    }
  };

  return (
    <Card className="flex flex-col justify-between h-40 hover:border-gray-700 transition-colors group relative overflow-hidden">
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-medium">{title}</h4>
        <div className="w-8 h-8 rounded-full bg-dash-bg border border-gray-800 flex items-center justify-center text-blue-400 group-hover:bg-blue-400/10 group-hover:text-blue-300 transition-colors">
          <Icon size={14} />
        </div>
      </div>
      
      <div className="mt-auto">
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-5xl font-bold font-mono tracking-tighter text-gray-100">{value}</span>
          <div className="flex flex-col">
            <span className="text-sm text-gray-400 font-medium">{unit}</span>
            {trend === 'up' && <span className="text-[10px] text-dash-warn">↑</span>}
            {trend === 'down' && <span className="text-[10px] text-blue-400">↓</span>}
            {trend === 'stable' && <span className="text-[10px] text-gray-500">—</span>}
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-800/50">
          <span className="text-[10px] text-gray-500 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-gray-500"></span>
            {lastUpdated}
          </span>
          <Badge variant={getBadgeVariant()} className="!text-[9px] !px-1.5 !py-0">
            {status === 'SAFE' ? 'NORMAL' : status}
          </Badge>
        </div>
      </div>
    </Card>
  );
}
