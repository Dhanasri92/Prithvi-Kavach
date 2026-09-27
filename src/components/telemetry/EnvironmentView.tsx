import type { TelemetryData, Alert } from '../../types/telemetry';
import { EnvironmentalConditions } from '../telemetry/EnvironmentalConditions';
import { SafetyInterlock } from '../hardware/SafetyInterlock';
import { MineZoneSchematic } from '../hardware/MineZoneSchematic';
import { RecentAlerts } from '../alerts/RecentAlerts';

interface EnvironmentViewProps {
  telemetry: TelemetryData | null;
  alerts: Alert[];
}

export function EnvironmentView({ telemetry, alerts }: EnvironmentViewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      <div className="space-y-6 flex flex-col">
        <div className="flex-1">
          <EnvironmentalConditions telemetry={telemetry} />
        </div>
        <div className="flex-1 min-h-[300px]">
          <MineZoneSchematic />
        </div>
      </div>
      
      <div className="space-y-6 flex flex-col">
        <div className="flex-none">
          <SafetyInterlock />
        </div>
        <div className="flex-1 min-h-[300px]">
          <RecentAlerts alerts={alerts} />
        </div>
      </div>
    </div>
  );
}
