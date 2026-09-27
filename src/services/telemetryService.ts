import type {  TelemetryData, HardwareStatus, Alert  } from '../types/telemetry';
import { determineSystemStatus } from '../utils/thresholds';

type TelemetryCallback = (data: TelemetryData) => void;
type HardwareCallback = (status: HardwareStatus) => void;
type AlertCallback = (alert: Alert) => void;

class TelemetryService {
  private intervalId: number | null = null;
  private telemetrySubscribers: TelemetryCallback[] = [];
  private hardwareSubscribers: HardwareCallback[] = [];
  private alertSubscribers: AlertCallback[] = [];

  // Base values for random walk
  private current = {
    temperature: 28.2,
    humidity: 66.1,
    distance: 2.79,
    tilt: 1.82,
    acceleration: 0.46,
    velocity: 0.21,
  };

  private hardwareStatus: HardwareStatus = {
    esp32: 'CONNECTED',
    mpu6050: 'CONNECTED',
    jsnSr04t: 'CONNECTED',
    dht22: 'CONNECTED',
    dataStreamActive: true,
    samplingRate: 10,
    communication: 'ONLINE (Serial/USB)',
    lastPacketTime: Date.now(),
  };

  public subscribe(
    onTelemetry: TelemetryCallback,
    onHardware: HardwareCallback,
    onAlert: AlertCallback
  ) {
    this.telemetrySubscribers.push(onTelemetry);
    this.hardwareSubscribers.push(onHardware);
    this.alertSubscribers.push(onAlert);
    
    // Initial emit
    onHardware(this.hardwareStatus);
    
    return () => {
      this.telemetrySubscribers = this.telemetrySubscribers.filter((cb) => cb !== onTelemetry);
      this.hardwareSubscribers = this.hardwareSubscribers.filter((cb) => cb !== onHardware);
      this.alertSubscribers = this.alertSubscribers.filter((cb) => cb !== onAlert);
    };
  }

  public startMockData(frequencyHz: number = 10) {
    if (this.intervalId !== null) return;
    
    const intervalMs = 1000 / frequencyHz;
    
    this.intervalId = window.setInterval(() => {
      this.generateMockData();
    }, intervalMs);
  }

  public stopMockData() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      
      this.hardwareStatus.dataStreamActive = false;
      this.notifyHardwareSubscribers();
    }
  }

  private generateMockData() {
    // Random walk
    const walk = (val: number, step: number, min: number, max: number) => {
      let next = val + (Math.random() - 0.5) * step;
      return Math.max(min, Math.min(max, next));
    };

    this.current.temperature = walk(this.current.temperature, 0.1, 20, 40);
    this.current.humidity = walk(this.current.humidity, 0.5, 40, 90);
    this.current.distance = walk(this.current.distance, 0.02, 2.0, 3.5);
    this.current.tilt = walk(this.current.tilt, 0.05, 0, 15);
    this.current.acceleration = walk(this.current.acceleration, 0.05, 0, 2);
    this.current.velocity = walk(this.current.velocity, 0.02, 0, 1.5);

    const status = determineSystemStatus(this.current);

    const now = new Date();
    // format timestamp like HH:mm:ss
    const timestamp = now.toTimeString().split(' ')[0];

    const telemetry: TelemetryData = {
      timestamp,
      temperature: Number(this.current.temperature.toFixed(1)),
      humidity: Number(this.current.humidity.toFixed(1)),
      distance: Number(this.current.distance.toFixed(2)),
      tilt: Number(this.current.tilt.toFixed(2)),
      acceleration: Number(this.current.acceleration.toFixed(2)),
      velocity: Number(this.current.velocity.toFixed(2)),
      status,
    };

    this.hardwareStatus.lastPacketTime = Date.now();

    this.notifyTelemetrySubscribers(telemetry);
    
    // throttle hardware notifications so we don't re-render too often
    if (Math.random() < 0.1) {
       this.notifyHardwareSubscribers();
    }
    
    // Simulate random alerts
    if (Math.random() < 0.001) {
      this.notifyAlertSubscribers({
        id: Math.random().toString(36).substring(7),
        timestamp: now.toISOString(),
        type: status === 'CRITICAL' ? 'CRIT' : status === 'WARNING' ? 'WARN' : 'INFO',
        message: 'Mock alert generated: ' + status,
      });
    }
  }

  private notifyTelemetrySubscribers(data: TelemetryData) {
    this.telemetrySubscribers.forEach((cb) => cb(data));
  }
  
  private notifyHardwareSubscribers() {
    this.hardwareSubscribers.forEach((cb) => cb({...this.hardwareStatus}));
  }

  private notifyAlertSubscribers(alert: Alert) {
    this.alertSubscribers.forEach((cb) => cb(alert));
  }
}

export const telemetryService = new TelemetryService();
