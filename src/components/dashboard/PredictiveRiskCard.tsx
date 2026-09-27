import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { predictionService } from '../../services/predictionService';

export function PredictiveRiskCard() {
  const prediction = predictionService.getPrediction();

  return (
    <Card className="h-full flex flex-col">
      <h3 className="text-sm font-bold tracking-wide uppercase text-gray-200 mb-1">Predictive Structural Risk</h3>
      <p className="text-xs text-gray-500 mb-8">Kinematic trend analysis</p>

      <div className="flex-1 flex flex-col items-center justify-center py-6 border-b border-gray-800/50 mb-4">
        <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">Time-to-collapse (Estimated)</span>
        <div className="text-5xl font-bold font-mono tracking-tighter text-gray-600 mb-6">
          {prediction.timeToCollapse || '--'}
        </div>
        <p className="text-sm text-gray-300 font-medium mb-1">{prediction.status}</p>
        <p className="text-xs text-gray-500">{prediction.message}</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Risk Level</span>
          <Badge variant={prediction.riskLevel === 'LOW' ? 'safe' : 'neutral'}>{prediction.riskLevel}</Badge>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Prediction Confidence</span>
          <span className="text-sm font-mono text-gray-500">{prediction.confidence || '--'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Structural Trend</span>
          <span className="text-sm font-medium text-dash-safe">{prediction.structuralTrend}</span>
        </div>
      </div>
    </Card>
  );
}
