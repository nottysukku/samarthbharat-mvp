/**
 * AWS Setup Script for SamarthBharat
 * Run once to create DynamoDB table and S3 bucket
 * 
 * Usage: npx tsx src/scripts/aws-setup.ts
 */
import { DynamoDBClient, CreateTableCommand, DescribeTableCommand } from '@aws-sdk/client-dynamodb';
import { S3Client, CreateBucketCommand, PutBucketCorsCommand, HeadBucketCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

const region = process.env.AWS_REGION || 'us-east-1';
const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
};

const dynamodb = new DynamoDBClient({ region, credentials });
const s3 = new S3Client({ region, credentials });

async function createDynamoDBTable() {
  const tableName = process.env.DYNAMODB_TABLE_NAME || 'SamarthBharat';
  
  // Check if table already exists
  try {
    await dynamodb.send(new DescribeTableCommand({ TableName: tableName }));
    console.log(`✅ DynamoDB table "${tableName}" already exists`);
    return;
  } catch (e: any) {
    if (e.name !== 'ResourceNotFoundException') throw e;
  }

  console.log(`📦 Creating DynamoDB table: ${tableName}...`);
  await dynamodb.send(new CreateTableCommand({
    TableName: tableName,
    KeySchema: [
      { AttributeName: 'pk', KeyType: 'HASH' },   // Partition key
      { AttributeName: 'sk', KeyType: 'RANGE' },   // Sort key
    ],
    AttributeDefinitions: [
      { AttributeName: 'pk', AttributeType: 'S' },
      { AttributeName: 'sk', AttributeType: 'S' },
    ],
    BillingMode: 'PAY_PER_REQUEST', // Serverless — no provisioned capacity needed
    // TTL is enabled separately after table creation
  }));

  console.log(`✅ DynamoDB table "${tableName}" created successfully!`);
  console.log(`   Partition key: pk (String)`);
  console.log(`   Sort key: sk (String)`);
  console.log(`   Billing: Pay-per-request (cost efficient!)`);
  console.log(`   ⚠️  Enable TTL on "ttl" attribute via AWS Console for automatic cleanup`);
}

async function createS3Bucket() {
  const bucketName = process.env.S3_BUCKET_NAME || 'samarthbharat-uploads';

  // Check if bucket already exists
  try {
    await s3.send(new HeadBucketCommand({ Bucket: bucketName }));
    console.log(`✅ S3 bucket "${bucketName}" already exists`);
    return;
  } catch (e: any) {
    if (e.name !== 'NotFound' && e.$metadata?.httpStatusCode !== 404) {
      // Bucket exists but we don't own it, or other error
      if (e.$metadata?.httpStatusCode === 403) {
        console.log(`⚠️  S3 bucket "${bucketName}" exists (owned by someone else). Pick a different name.`);
        return;
      }
    }
  }

  console.log(`📦 Creating S3 bucket: ${bucketName}...`);
  
  const createParams: any = { Bucket: bucketName };
  // us-east-1 doesn't need LocationConstraint
  if (region !== 'us-east-1') {
    createParams.CreateBucketConfiguration = { LocationConstraint: region };
  }

  await s3.send(new CreateBucketCommand(createParams));

  // Set CORS for browser uploads
  await s3.send(new PutBucketCorsCommand({
    Bucket: bucketName,
    CORSConfiguration: {
      CORSRules: [{
        AllowedHeaders: ['*'],
        AllowedMethods: ['GET', 'PUT', 'POST'],
        AllowedOrigins: ['*'], // Restrict in production
        ExposeHeaders: ['ETag'],
        MaxAgeSeconds: 3600,
      }],
    },
  }));

  console.log(`✅ S3 bucket "${bucketName}" created with CORS enabled!`);
}

async function main() {
  console.log('🚀 SamarthBharat AWS Setup');
  console.log(`   Region: ${region}`);
  console.log('');

  if (!credentials.accessKeyId || credentials.accessKeyId === 'your_aws_access_key_here') {
    console.error('❌ AWS credentials not set! Update your .env file first.');
    process.exit(1);
  }

  try {
    await createDynamoDBTable();
    console.log('');
    await createS3Bucket();
    console.log('');
    console.log('🎉 AWS setup complete! Your services are ready.');
    console.log('');
    console.log('Next steps:');
    console.log('  1. Enable TTL on DynamoDB table (attribute: "ttl") via AWS Console');
    console.log('  2. Enable Bedrock model access in AWS Console → Bedrock → Model access');
    console.log('  3. Start the backend: npm start');
  } catch (error) {
    console.error('❌ AWS setup failed:', error);
    process.exit(1);
  }
}

main();
