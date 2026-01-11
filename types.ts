
export enum Severity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface RawCloudLog {
  eventTime: string;
  userIdentity: { principalId: string; userName: string };
  eventName: string;
  requestParameters: any;
  sourceIPAddress: string;
  userAgent: string;
  additionalEventData?: { bytesTransferred?: number };
}

export interface CloudLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  service: 'AWS' | 'Azure' | 'GCP';
  location: string;
  ipAddress: string;
  dataVolume: number; // In MB
  raw?: any; // Original log source
}

export interface UserBaseline {
  userId: string;
  avgDataVolume: number; // 7-day avg
  usualLoginHour: number; // Peak hour
  commonLocations: string[];
  commonResources: string[];
}

export interface ScoreBreakdown {
  loginTime: number;
  dataSpike: number;
  newResource: number;
  newLocation: number;
  total: number;
}

export interface Alert {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  severity: Severity;
  type: string;
  description: string;
  riskScore: number;
  scoreBreakdown: ScoreBreakdown;
  status: 'PENDING' | 'INVESTIGATING' | 'RESOLVED';
  associatedLogs: CloudLog[];
}
