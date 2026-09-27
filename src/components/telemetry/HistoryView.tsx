import {  useState  } from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import type {  TelemetryData  } from '../../types/telemetry';
import { Download, Filter } from 'lucide-react';

interface HistoryViewProps {
  history: TelemetryData[];
}

export function HistoryView({ history }: HistoryViewProps) {
  const [filter, setFilter] = useState('ALL');
  
  const filteredHistory = history.filter(item => {
    if (filter === 'ALL') return true;
    return item.status === filter;
  });

  return (
    <Card className="h-full flex flex-col min-h-[600px]">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-sm font-bold tracking-wide uppercase text-gray-200">Telemetry History</h3>
          <p className="text-xs text-gray-500 mt-1">{filteredHistory.length} recorded readings from current session</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-dash-panel border border-gray-800 rounded-md px-3 py-1.5 cursor-pointer">
            <Filter size={14} className="text-gray-400" />
            <select 
              className="bg-transparent text-sm font-medium text-gray-300 outline-none cursor-pointer appearance-none pr-4"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="ALL">All Status</option>
              <option value="SAFE">Safe Only</option>
              <option value="WARNING">Warning Only</option>
              <option value="CRITICAL">Critical Only</option>
            </select>
          </div>
          
          <button className="flex items-center gap-2 border border-dash-accent/50 text-dash-accent hover:bg-dash-accent/10 transition-colors rounded-md px-4 py-1.5 text-sm font-medium uppercase tracking-wider">
            <Download size={14} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto rounded-lg border border-gray-800/50 bg-dash-bg/50">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="text-[10px] uppercase tracking-widest text-gray-500 bg-dash-panel/80 sticky top-0 backdrop-blur-sm">
            <tr>
              <th className="px-6 py-4 font-medium">Timestamp</th>
              <th className="px-6 py-4 font-medium text-right">Temp (°C)</th>
              <th className="px-6 py-4 font-medium text-right">Humidity (%)</th>
              <th className="px-6 py-4 font-medium text-right">Distance (m)</th>
              <th className="px-6 py-4 font-medium text-right">Tilt (°)</th>
              <th className="px-6 py-4 font-medium text-right">Accel (m/s²)</th>
              <th className="px-6 py-4 font-medium text-right">Velocity (m/s)</th>
              <th className="px-6 py-4 font-medium text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {filteredHistory.map((row, i) => (
              <tr key={i} className="hover:bg-dash-panel/30 transition-colors">
                <td className="px-6 py-3 font-mono text-gray-400">{row.timestamp}</td>
                <td className="px-6 py-3 font-mono text-right text-gray-300">{row.temperature.toFixed(1)}</td>
                <td className="px-6 py-3 font-mono text-right text-gray-300">{row.humidity.toFixed(1)}</td>
                <td className="px-6 py-3 font-mono text-right text-blue-400">{row.distance.toFixed(2)}</td>
                <td className="px-6 py-3 font-mono text-right text-gray-300">{row.tilt.toFixed(2)}</td>
                <td className="px-6 py-3 font-mono text-right text-dash-accent">{row.acceleration.toFixed(2)}</td>
                <td className="px-6 py-3 font-mono text-right text-dash-accent">{row.velocity.toFixed(2)}</td>
                <td className="px-6 py-3 text-center">
                  <Badge 
                    variant={row.status === 'SAFE' ? 'safe' : row.status === 'WARNING' ? 'warn' : 'crit'} 
                    className="!text-[9px]"
                  >
                    {row.status}
                  </Badge>
                </td>
              </tr>
            ))}
            {filteredHistory.length === 0 && (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                  No telemetry data available for current filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
        <div>1-{Math.min(15, filteredHistory.length)} of {filteredHistory.length}</div>
        <div className="flex gap-1">
          <button className="px-2 py-1 rounded bg-dash-panel border border-gray-800 text-gray-400 hover:text-gray-200">←</button>
          <button className="px-3 py-1 rounded bg-dash-accent/10 border border-dash-accent/20 text-dash-accent">1</button>
          <button className="px-3 py-1 rounded bg-dash-panel border border-gray-800 text-gray-400 hover:text-gray-200">2</button>
          <button className="px-3 py-1 rounded bg-dash-panel border border-gray-800 text-gray-400 hover:text-gray-200">3</button>
          <span className="px-2 py-1 text-gray-600">...</span>
          <button className="px-2 py-1 rounded bg-dash-panel border border-gray-800 text-gray-400 hover:text-gray-200">→</button>
        </div>
      </div>
    </Card>
  );
}
