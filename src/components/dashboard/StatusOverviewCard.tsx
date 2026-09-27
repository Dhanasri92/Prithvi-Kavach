import { Card } from '../common/Card';
import type {  SystemStatus, HardwareStatus  } from '../../types/telemetry';
import { CheckCircle2, AlertTriangle, XCircle, Activity } from 'lucide-react';

interface StatusOverviewCardProps {
  status: SystemStatus;
  hardware: HardwareStatus;
}

export function StatusOverviewCard({ status, hardware }: StatusOverviewCardProps) {
  const getStatusDetails = () => {
    switch (status) {
      case 'SAFE':
        return {
          icon: CheckCircle2,
          color: 'text-dash-safe',
          bg: 'bg-dash-safe/10',
          border: 'border-dash-safe/20',
          message: 'Structural parameters are within monitored limits.'
        };
      case 'WARNING':
        return {
          icon: AlertTriangle,
          color: 'text-dash-warn',
          bg: 'bg-dash-warn/10',
          border: 'border-dash-warn/20',
          message: 'Warning thresholds crossed. Monitor closely.'
        };
      case 'CRITICAL':
        return {
          icon: XCircle,
          color: 'text-dash-crit',
          bg: 'bg-dash-crit/10',
          border: 'border-dash-crit/20',
          message: 'CRITICAL INSTABILITY DETECTED. EVACUATE ZONE.'
        };
      default:
        return {
          icon: Activity,
          color: 'text-gray-400',
          bg: 'bg-gray-800',
          border: 'border-gray-700',
          message: 'Status unknown or offline.'
        };
    }
  };

  const details = getStatusDetails();
  const Icon = details.icon;
  
  const timeSinceLastPacket = ((Date.now() - hardware.lastPacketTime) / 1000).toFixed(1);

  return (
    <Card className="mb-6 border-gray-800 relative overflow-hidden group">
      <div className={`absolute inset-0 opacity-5 ${details.bg}`} />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-6">
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center border ${details.bg} ${details.border} ${details.color}`}>
            <Icon size={32} />
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-gray-400 text-xs tracking-widest uppercase font-medium">Zone A-01</span>
              <span className="text-gray-600 text-xs">|</span>
              <span className="text-dash-accent text-[10px] tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-dash-accent animate-pulse" />
                Live Monitoring
              </span>
            </div>
            <div className="flex items-end gap-4 mb-2">
              <h3 className="text-gray-400 text-sm uppercase tracking-wider font-medium mb-1">Current Status</h3>
              <div className={`text-4xl font-bold tracking-tight uppercase ${details.color}`}>
                {status}
              </div>
            </div>
            <p className="text-gray-400 text-sm">{details.message}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-dash-bg/50 p-4 rounded-xl border border-gray-800/50">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider">Hardware</span>
            <div className="flex items-center gap-1.5 text-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-dash-safe" />
              Connected
            </div>
          </div>
          
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider">Sampling</span>
            <div className="flex items-center text-sm font-medium font-mono text-blue-400">
              {hardware.samplingRate} Hz
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider">Last Reading</span>
            <div className="flex items-center text-sm font-medium font-mono text-gray-300">
              {timeSinceLastPacket}s ago
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider">Network</span>
            <div className="flex items-center text-sm font-medium">
              Online
            </div>
          </div>

          <div className="flex flex-col gap-1 lg:col-start-1">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider">Safety Interlock</span>
            <div className="flex items-center gap-1.5 text-sm font-medium text-dash-safe">
              <span className="w-1.5 h-1.5 rounded-full bg-dash-safe" />
              ARMED
            </div>
          </div>

          <div className="flex flex-col gap-1 lg:col-start-2">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider">Data Stream</span>
            <div className="flex items-center gap-1.5 text-sm font-medium text-blue-400">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Active
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
