import { Router } from 'express';
import multer from 'multer';
import { analyzeCropImage } from '../services/bedrock';
import { uploadBase64Image } from '../services/s3';
import { trackUsage } from '../services/dynamodb';
import { logger } from '../utils/logger';

const router = Router();

// Configure multer for image uploads (10MB max)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

router.post('/analyze', upload.single('image'), async (req, res) => {
  try {
    let imageBase64: string;
    let imageUrl: string | undefined;

    if (req.file) {
      // Image uploaded as file via multipart form
      imageBase64 = req.file.buffer.toString('base64');

      // Upload to S3 for record-keeping
      try {
        const s3Result = await uploadBase64Image(imageBase64, 'crop-diagnosis');
        imageUrl = s3Result.url;
        logger.info(`Crop image stored in S3: ${s3Result.key}`);
      } catch (s3Err) {
        logger.warn('S3 upload failed (non-critical), continuing with analysis');
      }
    } else if (req.body.imageBase64) {
      // Image sent as base64 in JSON body
      imageBase64 = req.body.imageBase64.replace(/^data:image\/\w+;base64,/, '');

      try {
        const s3Result = await uploadBase64Image(imageBase64, 'crop-diagnosis');
        imageUrl = s3Result.url;
      } catch (s3Err) {
        logger.warn('S3 upload failed (non-critical)');
      }
    } else {
      return res.status(400).json({ error: { code: 'NO_IMAGE', message: 'Please upload a crop image' } });
    }

    const description = req.body.description || '';

    // Call Bedrock Vision for AI diagnosis
    let diagnosisText: string;
    try {
      diagnosisText = await analyzeCropImage(imageBase64!, description);
    } catch (bedrockErr: any) {
      logger.error('Bedrock Vision error:', bedrockErr.message);
      // Fallback diagnosis
      return res.json({
        diagnosis: {
          disease: 'Leaf Blight (Fallback Analysis)',
          confidence: 75,
          severity: 'Moderate',
          symptoms: ['Brown spots on leaves', 'Yellowing edges', 'Wilting'],
          treatment: [
            'Remove infected leaves immediately',
            'Apply copper-based fungicide (Mancozeb 75% WP at 2g/L)',
            'Improve air circulation between plants',
            'Reduce overhead watering',
          ],
          prevention: [
            'Use disease-resistant varieties',
            'Maintain proper spacing between plants',
            'Practice crop rotation every season',
          ],
          additionalNotes: 'AI analysis temporarily unavailable. This is a general recommendation. Please visit your nearest Krishi Vigyan Kendra (KVK) for accurate diagnosis.',
        },
        imageUrl,
        _fallback: true,
      });
    }

    // Try to parse structured JSON from AI response
    let diagnosis;
    try {
      // Extract JSON from response (AI might wrap it in markdown)
      const jsonMatch = diagnosisText.match(/\{[\s\S]*\}/);
      diagnosis = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    } catch {
      diagnosis = null;
    }

    if (!diagnosis) {
      // AI returned free text, structure it
      diagnosis = {
        disease: 'Analysis Complete',
        confidence: 80,
        severity: 'See details',
        symptoms: [],
        treatment: [],
        prevention: [],
        additionalNotes: diagnosisText,
      };
    }

    // Track usage
    trackUsage('crop_diagnosis', { hasImage: true });

    res.json({
      diagnosis,
      imageUrl,
      rawAnalysis: diagnosisText,
    });
  } catch (error: any) {
    logger.error('Crop diagnosis error:', error);
    res.status(500).json({
      error: { code: 'DIAGNOSIS_ERROR', message: 'Failed to analyze crop image' },
    });
  }
});

export default router;
