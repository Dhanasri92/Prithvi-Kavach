export type SensorStatus = 'CONNECTED' | 'DISCONNECTED';
export type SystemStatus = 'SAFE' | 'WARNING' | 'CRITICAL' | 'OFFLINE' | 'NO_DATA';
export type InterlockState = 'ARMED' | 'TRIGGERED' | 'DISCONNECTED' | 'MANUAL_OVERRIDE';

export interface TelemetryData {
  timestamp: string; // ISO format or formatted string
  temperature: number; // °C
  humidity: number; // %
  distance: number; // meters (roof distance)
  tilt: number; // degrees
  acceleration: number; // m/s²
  velocity: number; // m/s
  status: SystemStatus;
}

export interface HardwareStatus {
  esp32: SensorStatus;
  mpu6050: SensorStatus;
  jsnSr04t: SensorStatus;
  dht22: SensorStatus;
  dataStreamActive: boolean;
  samplingRate: number; // Hz
  communication: string;
  lastPacketTime: number; // Date.now() timestamp
}

export interface InterlockStatus {
  state: InterlockState;
  relay: 'READY' | 'TRIGGERED';
  conveyor: 'RUNNING' | 'STOPPED';
  acousticAlarm: 'STANDBY' | 'ACTIVE';
  emergencyCutoff: 'STANDBY' | 'ENGAGED';
}

export interface Alert {
  id: string;
  timestamp: string;
  type: 'SYS' | 'INFO' | 'WARN' | 'CRIT';
  message: string;
}
