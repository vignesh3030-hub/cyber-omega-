
import { Severity, CloudLog, Alert, UserBaseline, RawCloudLog } from './types';

export const RAW_LOG_SAMPLES: RawCloudLog[] = [
  {
    eventTime: '2024-05-20T14:22:10Z',
    userIdentity: { principalId: 'u123', userName: 'Alice Smith' },
    eventName: 'PutObject',
    requestParameters: { bucketName: 'S3:PublicAssets' },
    sourceIPAddress: '192.168.1.5',
    userAgent: 'aws-sdk-go/1.44.0',
    additionalEventData: { bytesTransferred: 12582912 }
  },
  {
    eventTime: '2024-05-20T02:45:00Z',
    userIdentity: { principalId: 'u125', userName: 'Carlos Ray' },
    eventName: 'ModifyDBInstance',
    requestParameters: { resourceId: 'RDS:Production' },
    sourceIPAddress: '82.102.3.45',
    userAgent: 'Mozilla/5.0',
    additionalEventData: { bytesTransferred: 0 }
  }
];

export const MOCK_BASELINES: Record<string, UserBaseline> = {
  'u123': { 
    userId: 'u123', 
    avgDataVolume: 50, 
    usualLoginHour: 10, 
    commonLocations: ['San Francisco'], 
    commonResources: ['S3:PublicAssets', 'IAM'] 
  },
  'u124': { 
    userId: 'u124', 
    avgDataVolume: 200, 
    usualLoginHour: 9, 
    commonLocations: ['London'], 
    commonResources: ['BlobStorage', 'KeyVault'] 
  },
  'u125': { 
    userId: 'u125', 
    avgDataVolume: 10, 
    usualLoginHour: 14, 
    commonLocations: ['San Francisco'], 
    commonResources: ['EC2:InstanceManager'] 
  },
};

export const MOCK_LOGS: CloudLog[] = [];

export const MOCK_ALERTS: Alert[] = [];
