import { Card } from '../common/Card';
import type {  Alert  } from '../../types/telemetry';
import { Badge } from '../common/Badge';
import { Bell, CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react';

interface RecentAlertsProps {
  alerts: Alert[];
}

export function RecentAlerts({ alerts }: RecentAlertsProps) {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'SYS': return <CheckCircle2 size={16} className="text-gray-400" />;
      case 'INFO': return <Info size={16} className="text-blue-400" />;
      case 'WARN': return <AlertTriangle size={16} className="text-dash-warn" />;
      case 'CRIT': return <XCircle size={16} className="text-dash-crit" />;
      default: return <Bell size={16} className="text-gray-400" />;
    }
  };

  const getRowStyle = (type: string) => {
    switch (type) {
      case 'WARN': return 'bg-dash-warn/5 border-l-2 border-dash-warn';
      case 'CRIT': return 'bg-dash-crit/5 border-l-2 border-dash-crit';
      default: return 'hover:bg-dash-panel/30 border-l-2 border-transparent';
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-sm font-bold tracking-wide uppercase text-gray-200">Recent Alerts</h3>
          <p className="text-xs text-gray-500 mt-1">{alerts.length} total events</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
          LIVE
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button className="px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-dash-accent/20 text-dash-accent border border-dash-accent/30">ALL</button>
        <button className="px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-dash-panel text-gray-400 border border-gray-800 hover:text-gray-200">CRITICAL</button>
        <button className="px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-dash-panel text-gray-400 border border-gray-800 hover:text-gray-200">WARNING</button>
        <button className="px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-dash-panel text-gray-400 border border-gray-800 hover:text-gray-200">INFO</button>
        <button className="px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-dash-panel text-gray-400 border border-gray-800 hover:text-gray-200">SYSTEM</button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-2">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500 text-sm">No recent alerts</div>
        ) : (
          alerts.map((alert) => (
            <div key={alert.id} className={`flex items-start justify-between p-3 rounded-r-lg transition-colors ${getRowStyle(alert.type)}`}>
              <div className="flex gap-3">
                <div className="mt-0.5">{getAlertIcon(alert.type)}</div>
                <div>
                  <p className="text-sm font-medium text-gray-200 mb-1">{alert.message}</p>
                  <p className="text-[10px] text-gray-500">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <Badge variant={alert.type.toLowerCase() as any} className="!text-[9px]">
                {alert.type}
              </Badge>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
