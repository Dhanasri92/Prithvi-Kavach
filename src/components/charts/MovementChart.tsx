import { Card } from '../common/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import type {  TelemetryData  } from '../../types/telemetry';
import { THRESHOLDS } from '../../utils/thresholds';

interface MovementChartProps {
  data: TelemetryData[];
}

export function MovementChart({ data }: MovementChartProps) {
  // We want to display the chart from left to right, older to newer
  const chartData = [...data].reverse().slice(-50); // Show last 50 points

  const currentDistance = chartData.length > 0 ? chartData[chartData.length - 1].distance : 0;

  return (
    <Card className="h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-sm font-bold tracking-wide uppercase text-gray-200">Structural Movement</h3>
          <p className="text-xs text-gray-500 mt-1">Real-time structural movement from roof-mounted sensors</p>
        </div>
        <div className="text-right">
          <span className="text-3xl font-bold font-mono tracking-tighter text-gray-100 block leading-none">
            {currentDistance.toFixed(2)}
          </span>
          <span className="text-xs text-gray-500">m (current)</span>
        </div>
      </div>

      <div className="flex-1 min-h-[250px] w-full mt-4 -ml-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
            <XAxis 
              dataKey="timestamp" 
              stroke="#4b5563" 
              fontSize={10} 
              tickMargin={10}
              minTickGap={30}
            />
            <YAxis 
              stroke="#4b5563" 
              fontSize={10} 
              domain={[2.0, 3.5]} 
              tickCount={6}
              tickFormatter={(val) => `${val.toFixed(1)}m`}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px' }}
              itemStyle={{ color: '#60a5fa' }}
              labelStyle={{ color: '#9ca3af', marginBottom: '4px' }}
            />
            <ReferenceLine y={THRESHOLDS.DISTANCE.WARN} stroke="#f59e0b" strokeDasharray="3 3" label={{ position: 'insideBottomRight', value: 'WARN 2.5m', fill: '#f59e0b', fontSize: 10 }} />
            <ReferenceLine y={THRESHOLDS.DISTANCE.CRIT} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'insideBottomRight', value: 'CRIT 2.2m', fill: '#ef4444', fontSize: 10 }} />
            <Line 
              type="monotone" 
              dataKey="distance" 
              stroke="#3b82f6" 
              strokeWidth={2} 
              dot={false}
              activeDot={{ r: 4, fill: '#3b82f6', stroke: '#1d4ed8' }}
              isAnimationActive={false} // Disable animation for real-time feel
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
