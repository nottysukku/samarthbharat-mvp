import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { logger } from '../utils/logger';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'samarthbharat-uploads';

/**
 * Upload a file (image, document) to S3
 */
export async function uploadFile(
  key: string,
  body: Buffer,
  contentType: string
): Promise<string> {
  try {
    await s3Client.send(new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: body,
      ContentType: contentType,
    }));

    const url = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/${key}`;
    logger.info(`Uploaded to S3: ${key}`);
    return url;
  } catch (error) {
    logger.error('S3 upload error:', error);
    throw error;
  }
}

/**
 * Upload a base64 image to S3
 */
export async function uploadBase64Image(
  base64Data: string,
  folder: string = 'crop-images'
): Promise<{ url: string; key: string }> {
  // Strip data URI prefix if present
  const base64Clean = base64Data.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Clean, 'base64');

  const timestamp = Date.now();
  const key = `${folder}/${timestamp}-${Math.random().toString(36).substring(7)}.jpg`;

  const url = await uploadFile(key, buffer, 'image/jpeg');
  return { url, key };
}

/**
 * Get a pre-signed URL for temporary access to a private S3 object
 */
export async function getPresignedUrl(key: string, expiresIn = 3600): Promise<string> {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });
    return await getSignedUrl(s3Client, command, { expiresIn });
  } catch (error) {
    logger.error('S3 presigned URL error:', error);
    throw error;
  }
}

export default {
  uploadFile,
  uploadBase64Image,
  getPresignedUrl,
};
