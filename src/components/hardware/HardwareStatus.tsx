import { Card } from '../common/Card';
import type {  HardwareStatus as HardwareStatusType  } from '../../types/telemetry';

interface HardwareStatusProps {
  hardware: HardwareStatusType;
}

export function HardwareStatus({ hardware }: HardwareStatusProps) {
  const StatusDot = ({ connected }: { connected: boolean }) => (
    <span className={`w-2 h-2 rounded-full ${connected ? 'bg-dash-safe' : 'bg-dash-crit'}`}></span>
  );

  return (
    <Card>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-sm font-bold tracking-wide uppercase text-gray-200">Hardware Device Status</h3>
          <p className="text-xs text-gray-500 mt-1">ESP32 sensor node health</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-dash-safe/10 border border-dash-safe/20 text-dash-safe text-xs font-medium tracking-wide">
          <StatusDot connected={hardware.esp32 === 'CONNECTED'} />
          ESP32 CONNECTED
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        <div className="flex justify-between items-center border-b border-gray-800/50 pb-2">
          <span className="text-sm text-gray-400">ESP32 (Main MCU)</span>
          <span className={`text-sm font-medium flex items-center gap-2 ${hardware.esp32 === 'CONNECTED' ? 'text-dash-safe' : 'text-dash-crit'}`}>
            {hardware.esp32} <StatusDot connected={hardware.esp32 === 'CONNECTED'} />
          </span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-800/50 pb-2">
          <span className="text-sm text-gray-400">MPU6050 (IMU)</span>
          <span className={`text-sm font-medium flex items-center gap-2 ${hardware.mpu6050 === 'CONNECTED' ? 'text-dash-safe' : 'text-dash-crit'}`}>
            {hardware.mpu6050} <StatusDot connected={hardware.mpu6050 === 'CONNECTED'} />
          </span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-800/50 pb-2">
          <span className="text-sm text-gray-400">JSN-SR04T (Ultrasonic)</span>
          <span className={`text-sm font-medium flex items-center gap-2 ${hardware.jsnSr04t === 'CONNECTED' ? 'text-dash-safe' : 'text-dash-crit'}`}>
            {hardware.jsnSr04t} <StatusDot connected={hardware.jsnSr04t === 'CONNECTED'} />
          </span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-800/50 pb-2">
          <span className="text-sm text-gray-400">DHT22 (Temp/Humidity)</span>
          <span className={`text-sm font-medium flex items-center gap-2 ${hardware.dht22 === 'CONNECTED' ? 'text-dash-safe' : 'text-dash-crit'}`}>
            {hardware.dht22} <StatusDot connected={hardware.dht22 === 'CONNECTED'} />
          </span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-800/50 pb-2">
          <span className="text-sm text-gray-400">Data Stream</span>
          <span className={`text-sm font-medium flex items-center gap-2 ${hardware.dataStreamActive ? 'text-blue-400' : 'text-gray-500'}`}>
            {hardware.dataStreamActive ? 'ACTIVE' : 'INACTIVE'} 
            <span className={`w-2 h-2 rounded-full ${hardware.dataStreamActive ? 'bg-blue-400' : 'bg-gray-500'}`}></span>
          </span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-800/50 pb-2">
          <span className="text-sm text-gray-400">Sampling Rate</span>
          <span className="text-sm font-mono text-blue-400 flex items-center gap-2">
            {hardware.samplingRate} Hz <span className="w-2 h-2 rounded-full bg-blue-400"></span>
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Communication</span>
          <span className="text-sm font-medium text-dash-safe flex items-center gap-2">
            {hardware.communication} <StatusDot connected={true} />
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Last Packet</span>
          <span className="text-sm font-mono text-blue-400 flex items-center gap-2">
            {((Date.now() - hardware.lastPacketTime) / 1000).toFixed(1)} s ago <span className="w-2 h-2 rounded-full bg-blue-400"></span>
          </span>
        </div>
      </div>
      
      <div className="mt-8 pt-4 border-t border-gray-800 flex justify-between items-center">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5"><span className="text-gray-400">⎛</span> ESP32</span>
          <span className="flex items-center gap-1.5"><span className="text-gray-400">∿</span> MPU6050</span>
          <span className="flex items-center gap-1.5"><span className="text-gray-400">◎</span> JSN-SR04T</span>
        </div>
        <span className="text-xs text-gray-600">Prithvi Kavach — Prototype Hardware v1.0</span>
      </div>
    </Card>
  );
}
