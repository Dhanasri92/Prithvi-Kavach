import { Card } from '../common/Card';
import type {  TelemetryData  } from '../../types/telemetry';
import { Thermometer, Droplet, Menu, ArrowUpCircle } from 'lucide-react';

interface EnvironmentalConditionsProps {
  telemetry: TelemetryData | null;
}

export function EnvironmentalConditions({ telemetry }: EnvironmentalConditionsProps) {
  const temp = telemetry?.temperature ?? '--';
  const humidity = telemetry?.humidity ?? '--';

  return (
    <Card className="h-full">
      <div className="mb-6">
        <h3 className="text-sm font-bold tracking-wide uppercase text-gray-200">Environmental Conditions</h3>
        <p className="text-xs text-gray-500 mt-1">Active + planned sensor suite</p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="bg-dash-panel/50 border border-gray-800 rounded-lg p-4 flex items-center justify-between group hover:border-gray-700 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-dash-bg flex items-center justify-center text-gray-400 group-hover:text-dash-safe transition-colors">
              <Thermometer size={18} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Temperature</p>
              <div className="text-xl font-bold font-mono text-gray-200">{temp} <span className="text-sm text-gray-500">°C</span></div>
            </div>
          </div>
          <div className="w-2 h-2 rounded-full bg-dash-safe"></div>
        </div>

        <div className="bg-dash-panel/50 border border-gray-800 rounded-lg p-4 flex items-center justify-between group hover:border-gray-700 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-dash-bg flex items-center justify-center text-gray-400 group-hover:text-dash-safe transition-colors">
              <Droplet size={18} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Humidity</p>
              <div className="text-xl font-bold font-mono text-gray-200">{humidity} <span className="text-sm text-gray-500">%</span></div>
            </div>
          </div>
          <div className="w-2 h-2 rounded-full bg-dash-safe"></div>
        </div>
      </div>

      <div>
        <h4 className="text-[10px] font-bold tracking-widest uppercase text-gray-600 mb-4">Planned — Future Hardware</h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between opacity-50 grayscale cursor-not-allowed">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-dash-panel flex items-center justify-center text-gray-600">
                <Menu size={16} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400 font-medium">Methane (CH₄)</p>
                <div className="text-sm font-mono text-gray-600">--</div>
              </div>
            </div>
            <span className="px-2 py-1 rounded text-[10px] border border-gray-800 text-gray-500 uppercase">Future Sensor</span>
          </div>

          <div className="flex items-center justify-between opacity-50 grayscale cursor-not-allowed">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-dash-panel flex items-center justify-center text-gray-600">
                <ArrowUpCircle size={16} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400 font-medium">Carbon Dioxide (CO₂)</p>
                <div className="text-sm font-mono text-gray-600">--</div>
              </div>
            </div>
            <span className="px-2 py-1 rounded text-[10px] border border-gray-800 text-gray-500 uppercase">Future Sensor</span>
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-4 border-t border-gray-800">
        <p className="text-[10px] text-gray-600 leading-relaxed">
          Gas sensors planned for next prototype iteration. Current hardware: DHT22 (temp/humidity).
        </p>
      </div>
    </Card>
  );
}
