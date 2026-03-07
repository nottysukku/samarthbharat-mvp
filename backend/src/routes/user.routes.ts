import { Router } from 'express';

const router = Router();

// Mock user storage
const mockUsers: Record<string, any> = {};

router.get('/profile', async (req, res) => {
  try {
    const userId = 'mock-user-id'; // TODO: Get from JWT token
    
    const user = mockUsers[userId] || {
      id: userId,
      phoneNumber: '+919876543210',
      userType: null,
      location: null,
      language: 'en',
      preferences: {
        notifications: {
          push: true,
          sms: true,
          whatsapp: true,
          email: false
        }
      },
      createdAt: new Date().toISOString()
    };
    
    res.json(user);
  } catch (error) {
    res.status(500).json({
      error: {
        code: 'PROFILE_FETCH_ERROR',
        message: 'Failed to fetch profile'
      }
    });
  }
});

router.put('/profile', async (req, res) => {
  try {
    const userId = 'mock-user-id'; // TODO: Get from JWT token
    const updates = req.body;
    
    mockUsers[userId] = {
      ...mockUsers[userId],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    res.json({
      success: true,
      user: mockUsers[userId]
    });
  } catch (error) {
    res.status(500).json({
      error: {
        code: 'PROFILE_UPDATE_ERROR',
        message: 'Failed to update profile'
      }
    });
  }
});

router.delete('/profile', async (req, res) => {
  try {
    const userId = 'mock-user-id'; // TODO: Get from JWT token
    
    delete mockUsers[userId];
    
    res.json({
      success: true,
      message: 'Profile deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      error: {
        code: 'PROFILE_DELETE_ERROR',
        message: 'Failed to delete profile'
      }
    });
  }
});

export default router;
