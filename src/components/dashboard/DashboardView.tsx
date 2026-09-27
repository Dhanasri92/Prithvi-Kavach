import type {  TelemetryData, HardwareStatus  } from '../../types/telemetry';
import { StatusOverviewCard } from './StatusOverviewCard';
import { MetricCard } from './MetricCard';
import { MovementChart } from '../charts/MovementChart';
import { PredictiveRiskCard } from './PredictiveRiskCard';
import { Thermometer, Droplet, ArrowDownToLine, Compass, Zap, Wind } from 'lucide-react';

interface DashboardViewProps {
  telemetry: TelemetryData | null;
  history: TelemetryData[];
  hardware: HardwareStatus | null;
}

export function DashboardView({ telemetry, history, hardware }: DashboardViewProps) {
  if (!telemetry || !hardware) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-dash-accent border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 text-sm tracking-wider uppercase">Connecting to Hardware...</p>
        </div>
      </div>
    );
  }

  const lastUpdatedStr = `< 1s ago`; // Since we're updating at 10Hz

  return (
    <div className="space-y-6">
      <StatusOverviewCard status={telemetry.status} hardware={hardware} />
      
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        <MetricCard 
          title="Temperature"
          value={telemetry.temperature}
          unit="°C"
          icon={Thermometer}
          lastUpdated={lastUpdatedStr}
        />
        <MetricCard 
          title="Humidity"
          value={telemetry.humidity}
          unit="%"
          icon={Droplet}
          lastUpdated={lastUpdatedStr}
        />
        <MetricCard 
          title="Roof Distance"
          value={telemetry.distance.toFixed(2)}
          unit="m"
          icon={ArrowDownToLine}
          status={telemetry.distance <= 2.2 ? 'CRITICAL' : telemetry.distance <= 2.5 ? 'WARNING' : 'SAFE'}
          trend={history.length > 1 && telemetry.distance < history[1].distance ? 'down' : 'stable'}
          lastUpdated={lastUpdatedStr}
        />
        <MetricCard 
          title="Tilt Angle"
          value={telemetry.tilt.toFixed(2)}
          unit="°"
          icon={Compass}
          status={telemetry.tilt >= 10 ? 'CRITICAL' : telemetry.tilt >= 5 ? 'WARNING' : 'SAFE'}
          trend={history.length > 1 && telemetry.tilt > history[1].tilt ? 'up' : 'stable'}
          lastUpdated={lastUpdatedStr}
        />
        <MetricCard 
          title="Acceleration"
          value={telemetry.acceleration.toFixed(2)}
          unit="m/s²"
          icon={Zap}
          status={telemetry.acceleration >= 1.5 ? 'CRITICAL' : telemetry.acceleration >= 0.8 ? 'WARNING' : 'SAFE'}
          lastUpdated={lastUpdatedStr}
        />
        <MetricCard 
          title="Velocity"
          value={telemetry.velocity.toFixed(2)}
          unit="m/s"
          icon={Wind}
          status={telemetry.velocity >= 1.0 ? 'CRITICAL' : telemetry.velocity >= 0.5 ? 'WARNING' : 'SAFE'}
          lastUpdated={lastUpdatedStr}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 min-h-[400px]">
          <MovementChart data={history} />
        </div>
        <div>
          <PredictiveRiskCard />
        </div>
      </div>
    </div>
  );
}
