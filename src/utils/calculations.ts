import type {  TelemetryData  } from '../types/telemetry';

export function calculateAverage(data: TelemetryData[], key: keyof TelemetryData): number {
  if (data.length === 0) return 0;
  let sum = 0;
  for (const item of data) {
    const val = item[key];
    if (typeof val === 'number') {
      sum += val;
    }
  }
  return sum / data.length;
}

export function calculateMin(data: TelemetryData[], key: keyof TelemetryData): number {
  if (data.length === 0) return 0;
  let min = Infinity;
  for (const item of data) {
    const val = item[key];
    if (typeof val === 'number' && val < min) {
      min = val;
    }
  }
  return min;
}

export function calculateMax(data: TelemetryData[], key: keyof TelemetryData): number {
  if (data.length === 0) return 0;
  let max = -Infinity;
  for (const item of data) {
    const val = item[key];
    if (typeof val === 'number' && val > max) {
      max = val;
    }
  }
  return max;
}
