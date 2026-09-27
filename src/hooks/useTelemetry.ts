import { useState, useEffect } from 'react';
import { telemetryService } from '../services/telemetryService';
import type {  TelemetryData, HardwareStatus, Alert  } from '../types/telemetry';

export function useTelemetry() {
  const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);
  const [hardware, setHardware] = useState<HardwareStatus | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [history, setHistory] = useState<TelemetryData[]>([]);

  useEffect(() => {
    // Start generating data when the hook is used
    telemetryService.startMockData(10);

    const unsubscribe = telemetryService.subscribe(
      (data) => {
        setTelemetry(data);
        setHistory((prev) => {
          const next = [data, ...prev];
          // Keep the last 200 items to avoid memory leak
          if (next.length > 200) {
            next.pop();
          }
          return next;
        });
      },
      (status) => {
        setHardware(status);
      },
      (alert) => {
        setAlerts((prev) => [alert, ...prev].slice(0, 50));
      }
    );

    return () => {
      unsubscribe();
      telemetryService.stopMockData();
    };
  }, []);

  return { telemetry, hardware, alerts, history };
}
