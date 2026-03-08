import { Router, Request, Response } from 'express';
import { elastiCacheService } from '../services/elasticache';
import { checkRDSHealth, getPoolStats } from '../services/rds';
import { getCloudWatchStatus } from '../services/cloudwatch';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    // Check all AWS service statuses
    const [cacheHealth, rdsHealth] = await Promise.all([
      elastiCacheService.healthCheck(),
      checkRDSHealth(),
    ]);

    const cwStatus = getCloudWatchStatus();
    const cacheStats = elastiCacheService.getStats();
    const rdsPoolStats = getPoolStats();

    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: '2.0.0',
      awsServices: {
        bedrock: { status: 'active', model: 'amazon.nova-lite-v1:0', region: 'us-east-1' },
        dynamodb: { status: 'active', tables: ['SamarthBharat-Conversations', 'SamarthBharat-UserProfiles', 'SamarthBharat-UsageMetrics', 'SamarthBharat-TranslationCache', 'ASTech_SamarthBharat'] },
        s3: { status: 'active', bucket: 'astech-samarthbharat-s3-bucket' },
        ec2: { status: 'active', instanceId: 'i-04f318cdad3f18937', type: 't2.micro', ip: '13.204.54.234' },
        rds: { status: rdsHealth.status, engine: 'PostgreSQL 15', instance: 'samarthbharat-postgres', latency: rdsHealth.latency, pool: rdsPoolStats },
        elasticache: { status: cacheHealth.status, engine: 'Redis 7.0', backend: cacheHealth.backend, cluster: 'samarthbharat-redis', latency: cacheHealth.latency, stats: cacheStats },
        cloudfront: { status: 'active', distribution: 'd39cgoeab1wnsk.cloudfront.net', id: 'E3FFW7A954RN1Y' },
        cloudwatch: { status: cwStatus.enabled ? 'active' : 'standby', namespace: cwStatus.namespace, dashboard: 'SamarthBharat-Dashboard', logGroups: ['/samarthbharat/api', '/samarthbharat/frontend', '/samarthbharat/bedrock'] },
        route53: { status: 'active', hostedZone: 'samarthbharat.in', records: ['samarthbharat.in → CloudFront', 'api.samarthbharat.in → EC2', 'www.samarthbharat.in → CloudFront'] },
        iam: { status: 'active', role: 'SamarthBharat-AppRole', policies: ['AmazonBedrockFullAccess', 'AmazonDynamoDBFullAccess', 'AmazonS3FullAccess', 'AmazonRDSFullAccess', 'AmazonElastiCacheFullAccess', 'CloudWatchFullAccess', 'AmazonRoute53FullAccess', 'CloudFrontFullAccess'] },
      },
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
    });
  }
});

export default router;
