
import { CloudLog, RawCloudLog, UserBaseline, ScoreBreakdown, Alert, Severity } from '../types';

/**
 * Step 2: Data Normalization
 * Parses raw vendor-specific logs into a structured CITEWS format.
 */
export const normalizeLog = (raw: RawCloudLog, id: string): CloudLog => {
  const dataVol = raw.additionalEventData?.bytesTransferred 
    ? Math.round(raw.additionalEventData.bytesTransferred / (1024 * 1024)) 
    : 0;

  return {
    id,
    timestamp: raw.eventTime,
    userId: raw.userIdentity.principalId,
    userName: raw.userIdentity.userName,
    action: raw.eventName,
    resource: raw.requestParameters?.bucketName || raw.requestParameters?.resourceId || 'Unknown',
    service: 'AWS',
    location: raw.sourceIPAddress.startsWith('192') ? 'HQ - San Francisco' : 'Remote - Moscow',
    ipAddress: raw.sourceIPAddress,
    dataVolume: dataVol,
    raw: raw // Preserving raw data for the logs view
  };
};

/**
 * Step 4 & 5: Real-time Monitoring & Anomaly Scoring
 * Compares log against baseline and returns a points-based score.
 */
export const calculateAnomalyScore = (log: CloudLog, baseline: UserBaseline): ScoreBreakdown => {
  const scores = {
    loginTime: 0,
    dataSpike: 0,
    newResource: 0,
    newLocation: 0,
    total: 0
  };

  const eventHour = new Date(log.timestamp).getUTCHours();
  
  // Login Hour Deviation > 3hrs (20pts)
  if (Math.abs(eventHour - baseline.usualLoginHour) > 3) {
    scores.loginTime = 20;
  }

  // Data Spike > 3x Average (30pts)
  if (log.dataVolume > (baseline.avgDataVolume * 3)) {
    scores.dataSpike = 30;
  }

  // New Resource Access (25pts)
  if (!baseline.commonResources.includes(log.resource)) {
    scores.newResource = 25;
  }

  // New Location (25pts)
  if (!baseline.commonLocations.includes(log.location)) {
    scores.newLocation = 25;
  }

  scores.total = scores.loginTime + scores.dataSpike + scores.newResource + scores.newLocation;
  return scores;
};

/**
 * Step 6: Alert Generation
 * Score > 50 = MEDIUM risk, > 80 = HIGH risk
 */
export const createAlertFromScore = (log: CloudLog, score: ScoreBreakdown): Alert | null => {
  if (score.total < 50) return null;

  let severity = Severity.MEDIUM;
  if (score.total > 80) severity = Severity.HIGH;

  return {
    id: `alert-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
    timestamp: new Date().toISOString(),
    userId: log.userId,
    userName: log.userName,
    severity,
    type: score.total > 80 ? 'Critical Behavioral Anomaly' : 'Suspicious User Activity',
    description: `User ${log.userName} triggered a risk score of ${score.total} due to significant deviations from the established 7-day behavior baseline.`,
    riskScore: score.total,
    scoreBreakdown: score,
    status: 'PENDING',
    associatedLogs: [log]
  };
};
