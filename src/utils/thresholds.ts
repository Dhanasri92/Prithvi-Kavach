import type {  SystemStatus  } from '../types/telemetry';

export const THRESHOLDS = {
  DISTANCE: {
    WARN: 2.5, // Below 2.5m is warning
    CRIT: 2.2, // Below 2.2m is critical
  },
  TILT: {
    WARN: 5.0,
    CRIT: 10.0,
  },
  ACCELERATION: {
    WARN: 0.8,
    CRIT: 1.5,
  },
  VELOCITY: {
    WARN: 0.5,
    CRIT: 1.0,
  },
  TEMPERATURE: {
    WARN: 35,
    CRIT: 45,
  }
};

export function determineSystemStatus(data: { distance: number; tilt: number; acceleration: number; velocity: number }): SystemStatus {
  if (
    data.distance <= THRESHOLDS.DISTANCE.CRIT ||
    data.tilt >= THRESHOLDS.TILT.CRIT ||
    data.acceleration >= THRESHOLDS.ACCELERATION.CRIT ||
    data.velocity >= THRESHOLDS.VELOCITY.CRIT
  ) {
    return 'CRITICAL';
  }

  if (
    data.distance <= THRESHOLDS.DISTANCE.WARN ||
    data.tilt >= THRESHOLDS.TILT.WARN ||
    data.acceleration >= THRESHOLDS.ACCELERATION.WARN ||
    data.velocity >= THRESHOLDS.VELOCITY.WARN
  ) {
    return 'WARNING';
  }

  return 'SAFE';
}
