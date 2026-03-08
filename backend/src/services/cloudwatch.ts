import { logger } from '../utils/logger';

// ────────────── CloudWatch Integration ──────────────
// Log Groups: /samarthbharat/api, /samarthbharat/frontend, /samarthbharat/bedrock
// Dashboard: SamarthBharat-Dashboard
// Alarms: SamarthBharat-HighErrorRate
// SNS Topic: SamarthBharat-Alerts

let cwClient: any = null;
let cwEnabled = false;

// Try to initialize CloudWatch client
async function initCloudWatch(): Promise<void> {
  try {
    const { CloudWatchClient, PutMetricDataCommand } = await import('@aws-sdk/client-cloudwatch');
    cwClient = new CloudWatchClient({
      region: process.env.AWS_REGION || 'ap-south-1',
      credentials: process.env.AWS_ACCESS_KEY_ID ? {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      } : undefined,
    });
    cwEnabled = true;
    logger.info('✅ CloudWatch metrics client initialized');
  } catch (error: any) {
    logger.warn('CloudWatch client not available:', error.message);
  }
}

initCloudWatch().catch(() => {});

const NAMESPACE = 'SamarthBharat';

// ────────────── Custom Metric Publishing ──────────────
export async function putMetric(
  metricName: string,
  value: number,
  unit: string = 'Count',
  dimensions: Array<{ Name: string; Value: string }> = []
): Promise<void> {
  if (!cwEnabled || !cwClient) return;

  try {
    const { PutMetricDataCommand } = await import('@aws-sdk/client-cloudwatch');
    await cwClient.send(new PutMetricDataCommand({
      Namespace: NAMESPACE,
      MetricData: [{
        MetricName: metricName,
        Value: value,
        Unit: unit,
        Timestamp: new Date(),
        Dimensions: dimensions.length > 0 ? dimensions : [
          { Name: 'Environment', Value: process.env.NODE_ENV || 'development' },
        ],
      }],
    }));
  } catch (error: any) {
    // Non-fatal - don't break the app for metrics
    logger.debug('CloudWatch putMetric error:', error.message);
  }
}

// ────────────── Pre-built Metric Helpers ──────────────

/** Track API request count */
export async function trackAPIRequest(endpoint: string, method: string): Promise<void> {
  await putMetric('APIRequests', 1, 'Count', [
    { Name: 'Endpoint', Value: endpoint },
    { Name: 'Method', Value: method },
  ]);
}

/** Track API response time */
export async function trackResponseTime(endpoint: string, durationMs: number): Promise<void> {
  await putMetric('ResponseTime', durationMs, 'Milliseconds', [
    { Name: 'Endpoint', Value: endpoint },
  ]);
}

/** Track API errors */
export async function trackError(endpoint: string, statusCode: number): Promise<void> {
  await putMetric('APIErrors', 1, 'Count', [
    { Name: 'Endpoint', Value: endpoint },
    { Name: 'StatusCode', Value: String(statusCode) },
  ]);
}

/** Track Bedrock AI usage */
export async function trackBedrockUsage(tokensUsed: number, cached: boolean): Promise<void> {
  await putMetric('BedrockTokens', tokensUsed, 'Count', [
    { Name: 'Cached', Value: cached ? 'true' : 'false' },
  ]);
}

/** Track chat messages */
export async function trackChatMessage(userType: string): Promise<void> {
  await putMetric('ChatMessages', 1, 'Count', [
    { Name: 'UserType', Value: userType },
  ]);
}

/** Track translation requests */
export async function trackTranslation(targetLang: string): Promise<void> {
  await putMetric('TranslationRequests', 1, 'Count', [
    { Name: 'TargetLanguage', Value: targetLang },
  ]);
}

/** Track active users */
export async function trackActiveUser(userType: string): Promise<void> {
  await putMetric('ActiveUsers', 1, 'Count', [
    { Name: 'UserType', Value: userType },
  ]);
}

// ────────────── Health Check ──────────────
export function getCloudWatchStatus(): { enabled: boolean; namespace: string } {
  return {
    enabled: cwEnabled,
    namespace: NAMESPACE,
  };
}

export default {
  putMetric,
  trackAPIRequest,
  trackResponseTime,
  trackError,
  trackBedrockUsage,
  trackChatMessage,
  trackTranslation,
  trackActiveUser,
  getCloudWatchStatus,
};
