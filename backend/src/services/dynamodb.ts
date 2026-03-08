import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  QueryCommand,
  DeleteCommand,
} from '@aws-sdk/lib-dynamodb';
import { createHash } from 'crypto';
import { logger } from '../utils/logger';

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'SamarthBharat';

// ────────────── HASH FOR LLM CACHING ──────────────
function hashPrompt(prompt: string): string {
  return createHash('sha256').update(prompt).digest('hex');
}

// ────────────── LLM RESPONSE CACHE (Cost Efficiency!) ──────────────
// This implements: hash(prompt) → check DynamoDB cache → return cached or call LLM
export async function getCachedLLMResponse(prompt: string, userType: string): Promise<string | null> {
  try {
    const hash = hashPrompt(`${userType}:${prompt}`);
    const result = await docClient.send(new GetCommand({
      TableName: TABLE_NAME,
      Key: { pk: `CACHE#${hash}`, sk: 'RESPONSE' },
    }));

    if (result.Item && result.Item.ttl > Math.floor(Date.now() / 1000)) {
      logger.info(`Cache HIT for prompt hash: ${hash.substring(0, 8)}...`);
      return result.Item.response;
    }
    return null;
  } catch (error) {
    logger.warn('DynamoDB cache read error (non-fatal):', error);
    return null;
  }
}

export async function cacheLLMResponse(prompt: string, userType: string, response: string): Promise<void> {
  try {
    const hash = hashPrompt(`${userType}:${prompt}`);
    await docClient.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        pk: `CACHE#${hash}`,
        sk: 'RESPONSE',
        response,
        userType,
        promptPreview: prompt.substring(0, 100),
        ttl: Math.floor(Date.now() / 1000) + 86400, // 24 hour TTL
        createdAt: new Date().toISOString(),
      },
    }));
    logger.info(`Cached LLM response: ${hash.substring(0, 8)}...`);
  } catch (error) {
    logger.warn('DynamoDB cache write error (non-fatal):', error);
  }
}

// ────────────── CHAT HISTORY ──────────────
export interface ChatMessageRecord {
  conversationId: string;
  messageId: string;
  role: 'user' | 'assistant';
  content: string;
  userType: string;
  timestamp: string;
}

export async function saveChatMessage(msg: ChatMessageRecord): Promise<void> {
  try {
    await docClient.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        pk: `CONV#${msg.conversationId}`,
        sk: `MSG#${msg.timestamp}#${msg.messageId}`,
        role: msg.role,
        content: msg.content,
        userType: msg.userType,
        timestamp: msg.timestamp,
        ttl: Math.floor(Date.now() / 1000) + 7 * 86400, // 7 day TTL
      },
    }));
  } catch (error) {
    logger.warn('DynamoDB save chat error (non-fatal):', error);
  }
}

export async function getChatHistory(conversationId: string, limit = 20): Promise<ChatMessageRecord[]> {
  try {
    const result = await docClient.send(new QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression: 'pk = :pk AND begins_with(sk, :sk)',
      ExpressionAttributeValues: {
        ':pk': `CONV#${conversationId}`,
        ':sk': 'MSG#',
      },
      ScanIndexForward: true, // oldest first
      Limit: limit,
    }));

    return (result.Items || []).map(item => ({
      conversationId,
      messageId: item.sk.split('#')[2] || '',
      role: item.role,
      content: item.content,
      userType: item.userType,
      timestamp: item.timestamp,
    }));
  } catch (error) {
    logger.warn('DynamoDB get history error (non-fatal):', error);
    return [];
  }
}

// ────────────── USER PROFILES ──────────────
export async function saveUserProfile(userId: string, profile: Record<string, any>): Promise<void> {
  try {
    await docClient.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        pk: `USER#${userId}`,
        sk: 'PROFILE',
        ...profile,
        updatedAt: new Date().toISOString(),
      },
    }));
  } catch (error) {
    logger.warn('DynamoDB save profile error (non-fatal):', error);
  }
}

export async function getUserProfile(userId: string): Promise<Record<string, any> | null> {
  try {
    const result = await docClient.send(new GetCommand({
      TableName: TABLE_NAME,
      Key: { pk: `USER#${userId}`, sk: 'PROFILE' },
    }));
    return result.Item || null;
  } catch (error) {
    logger.warn('DynamoDB get profile error (non-fatal):', error);
    return null;
  }
}

// ────────────── ANALYTICS / USAGE TRACKING ──────────────
export async function trackUsage(eventType: string, metadata: Record<string, any>): Promise<void> {
  try {
    const timestamp = new Date().toISOString();
    await docClient.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        pk: `ANALYTICS#${eventType}`,
        sk: `${timestamp}`,
        ...metadata,
        ttl: Math.floor(Date.now() / 1000) + 30 * 86400, // 30 day TTL
      },
    }));
  } catch (error) {
    // Silent fail for analytics
  }
}

export default {
  getCachedLLMResponse,
  cacheLLMResponse,
  saveChatMessage,
  getChatHistory,
  saveUserProfile,
  getUserProfile,
  trackUsage,
};
