import { Router } from 'express';
import { authLimiter } from '../middleware/rateLimiter';

const router = Router();

// Mock authentication - replace with real Twilio OTP later
router.post('/request-otp', authLimiter, async (req, res) => {
  const { phoneNumber } = req.body;
  
  // TODO: Replace with real Twilio OTP
  // const otp = await twilioService.sendOTP(phoneNumber);
  
  res.json({
    success: true,
    message: 'OTP sent successfully (MOCK)',
    expiresIn: 300
  });
});

router.post('/verify-otp', authLimiter, async (req, res) => {
  const { phoneNumber, otp } = req.body;
  
  // TODO: Replace with real OTP verification
  // const isValid = await twilioService.verifyOTP(phoneNumber, otp);
  
  // Mock: Accept any 6-digit OTP
  if (otp && otp.length === 6) {
    res.json({
      success: true,
      accessToken: 'mock-jwt-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now(),
      user: {
        id: 'user-' + phoneNumber,
        phoneNumber,
        userType: null
      }
    });
  } else {
    res.status(400).json({
      error: {
        code: 'INVALID_OTP',
        message: 'Invalid OTP'
      }
    });
  }
});

router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  
  // TODO: Replace with real JWT refresh
  res.json({
    accessToken: 'mock-jwt-token-' + Date.now()
  });
});

export default router;
