import { User, Signal, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '../common/Badge';

interface TopbarProps {
  lastPacketTime: number;
}

export function Topbar({ lastPacketTime }: TopbarProps) {
  const isLive = Date.now() - lastPacketTime < 5000;
  
  return (
    <header className="h-16 border-b border-gray-800 bg-dash-bg flex items-center justify-between px-6 shrink-0">
      <div>
        <h2 className="text-gray-200 font-semibold tracking-wide text-sm uppercase">Mine Safety Dashboard</h2>
        <p className="text-gray-500 text-xs">Real-Time Subsidence Monitor · Smart India Hackathon 2026</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 bg-dash-panel border border-gray-800 rounded-md px-3 py-1.5 cursor-pointer hover:bg-gray-800 transition-colors">
          <MapPin size={14} className="text-dash-accent" />
          <span className="text-sm font-medium">ZONE A-01</span>
        </div>

        <Badge variant={isLive ? 'crit' : 'neutral'} dot className={isLive ? '!bg-red-500/10 !text-red-400 !border-red-500/20' : ''}>
          {isLive ? 'Live Monitoring' : 'Data Stale'}
        </Badge>

        <div className="text-right flex flex-col items-end justify-center min-w-[80px]">
          <span className="text-sm font-bold font-mono tracking-wider text-gray-200 leading-none">
            {format(new Date(), 'HH:mm:ss')}
          </span>
          <span className="text-[10px] text-gray-500 mt-1">
            {format(new Date(), 'dd MMM yyyy')}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${isLive ? 'bg-dash-safe/10 border-dash-safe/20 text-dash-safe' : 'bg-gray-800 border-gray-700 text-gray-400'} text-xs font-medium`}>
            <Signal size={12} />
            {isLive ? 'Live' : 'Offline'}
          </div>
          
          <button className="w-8 h-8 rounded-full border border-gray-700 bg-dash-panel flex items-center justify-center text-gray-400 hover:text-gray-200 transition-colors">
            <User size={14} />
          </button>
        </div>
      </div>
    </header>
  );
}
