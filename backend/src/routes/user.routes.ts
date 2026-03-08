import { Router } from 'express';
import { saveUserProfile, getUserProfile } from '../services/dynamodb';
import { logger } from '../utils/logger';

const router = Router();

router.get('/profile', async (req, res) => {
  try {
    const userId = (req.headers['x-user-id'] as string) || 'default-user';

    const profile = await getUserProfile(userId);

    res.json(profile || {
      id: userId,
      phoneNumber: '+919876543210',
      userType: null,
      location: null,
      language: 'en',
      preferences: { notifications: { push: true, sms: true, whatsapp: true, email: false } },
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Profile fetch error:', error);
    res.status(500).json({ error: { code: 'PROFILE_FETCH_ERROR', message: 'Failed to fetch profile' } });
  }
});

router.put('/profile', async (req, res) => {
  try {
    const userId = (req.headers['x-user-id'] as string) || 'default-user';
    const updates = req.body;

    await saveUserProfile(userId, { ...updates, id: userId });

    res.json({ success: true, user: { ...updates, id: userId, updatedAt: new Date().toISOString() } });
  } catch (error) {
    logger.error('Profile update error:', error);
    res.status(500).json({ error: { code: 'PROFILE_UPDATE_ERROR', message: 'Failed to update profile' } });
  }
});

router.delete('/profile', async (req, res) => {
  try {
    const userId = (req.headers['x-user-id'] as string) || 'default-user';
    // Soft delete - just mark as deleted
    await saveUserProfile(userId, { id: userId, deleted: true });
    res.json({ success: true, message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: { code: 'PROFILE_DELETE_ERROR', message: 'Failed to delete profile' } });
  }
});

export default router;
