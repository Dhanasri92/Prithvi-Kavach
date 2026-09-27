import {  useState  } from 'react';
import { Card } from '../common/Card';
import type {  InterlockStatus  } from '../../types/telemetry';
import { Shield, ShieldAlert, Power } from 'lucide-react';

export function SafetyInterlock() {
  const [interlock] = useState<InterlockStatus>({
    state: 'ARMED',
    relay: 'READY',
    conveyor: 'RUNNING',
    acousticAlarm: 'STANDBY',
    emergencyCutoff: 'STANDBY'
  });

  const isArmed = interlock.state === 'ARMED';

  return (
    <Card className="h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-sm font-bold tracking-wide uppercase text-gray-200">Safety Interlock</h3>
          <p className="text-xs text-gray-500 mt-1">Local relay-based safety interlock</p>
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${isArmed ? 'bg-dash-safe/10 text-dash-safe border-dash-safe/20' : 'bg-dash-crit/10 text-dash-crit border-dash-crit/20'}`}>
          {isArmed ? <Shield size={20} /> : <ShieldAlert size={20} />}
        </div>
      </div>

      <div className={`py-6 flex flex-col items-center justify-center rounded-xl border mb-6 ${isArmed ? 'bg-dash-safe/5 border-dash-safe/20' : 'bg-dash-crit/5 border-dash-crit/20'}`}>
        <div className={`text-2xl font-bold tracking-widest uppercase flex items-center gap-3 ${isArmed ? 'text-dash-safe' : 'text-dash-crit'}`}>
          <span className={`w-3 h-3 rounded-full ${isArmed ? 'bg-dash-safe animate-pulse' : 'bg-dash-crit'}`}></span>
          {interlock.state}
        </div>
        <p className={`text-sm mt-2 ${isArmed ? 'text-dash-safe/70' : 'text-dash-crit/70'}`}>
          {isArmed ? 'Monitoring — ready to trigger' : 'SYSTEM TRIGGERED — HARDWARE LOCKED'}
        </p>
      </div>

      <div className="space-y-4 mb-8 flex-1">
        <div className="flex justify-between items-center border-b border-gray-800/50 pb-2">
          <span className="text-sm text-gray-400">Relay</span>
          <span className={`text-sm font-medium ${interlock.relay === 'READY' ? 'text-dash-safe' : 'text-dash-crit'}`}>{interlock.relay}</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-800/50 pb-2">
          <span className="text-sm text-gray-400">Conveyor</span>
          <span className={`text-sm font-medium ${interlock.conveyor === 'RUNNING' ? 'text-dash-safe' : 'text-dash-crit'}`}>{interlock.conveyor}</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-800/50 pb-2">
          <span className="text-sm text-gray-400">Acoustic Alarm</span>
          <span className={`text-sm font-medium ${interlock.acousticAlarm === 'STANDBY' ? 'text-gray-500' : 'text-dash-warn'}`}>{interlock.acousticAlarm}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Emergency Cutoff</span>
          <span className={`text-sm font-medium ${interlock.emergencyCutoff === 'STANDBY' ? 'text-gray-500' : 'text-dash-crit'}`}>{interlock.emergencyCutoff}</span>
        </div>
      </div>

      <div className="mt-auto flex items-start gap-3 pt-4 border-t border-gray-800">
        <Power size={14} className="text-gray-500 shrink-0 mt-0.5" />
        <p className="text-xs text-gray-500 leading-relaxed">
          5V optocoupler relay · cuts conveyor power on trigger. Local acoustic alarm included. Prototype implementation.
        </p>
      </div>
    </Card>
  );
}
