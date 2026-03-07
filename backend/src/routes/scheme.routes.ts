import { Router } from 'express';
import schemes from '../data/mockSchemes.json';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { userType, category, search, limit = '10', offset = '0' } = req.query;
    
    let filteredSchemes = [...schemes];
    
    // Filter by user type
    if (userType) {
      filteredSchemes = filteredSchemes.filter(scheme => 
        scheme.targetUserTypes.includes(userType as string)
      );
    }
    
    // Filter by category
    if (category) {
      filteredSchemes = filteredSchemes.filter(scheme => 
        scheme.category === category
      );
    }
    
    // Search by name or description
    if (search) {
      const searchLower = (search as string).toLowerCase();
      filteredSchemes = filteredSchemes.filter(scheme =>
        scheme.name.toLowerCase().includes(searchLower) ||
        scheme.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Pagination
    const start = parseInt(offset as string);
    const end = start + parseInt(limit as string);
    const paginatedSchemes = filteredSchemes.slice(start, end);
    
    res.json({
      schemes: paginatedSchemes,
      total: filteredSchemes.length
    });
  } catch (error) {
    res.status(500).json({
      error: {
        code: 'SCHEME_FETCH_ERROR',
        message: 'Failed to fetch schemes'
      }
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const scheme = schemes.find(s => s.id === id);
    
    if (!scheme) {
      return res.status(404).json({
        error: {
          code: 'SCHEME_NOT_FOUND',
          message: 'Scheme not found'
        }
      });
    }
    
    res.json(scheme);
  } catch (error) {
    res.status(500).json({
      error: {
        code: 'SCHEME_FETCH_ERROR',
        message: 'Failed to fetch scheme'
      }
    });
  }
});

router.post('/check-eligibility', async (req, res) => {
  try {
    const { schemeId, userProfile } = req.body;
    
    const scheme = schemes.find(s => s.id === schemeId);
    
    if (!scheme) {
      return res.status(404).json({
        error: {
          code: 'SCHEME_NOT_FOUND',
          message: 'Scheme not found'
        }
      });
    }
    
    // Mock eligibility check - always return eligible for demo
    res.json({
      eligible: true,
      reasons: [
        'You meet the basic eligibility criteria',
        'Your profile matches the scheme requirements'
      ],
      missingInfo: []
    });
  } catch (error) {
    res.status(500).json({
      error: {
        code: 'ELIGIBILITY_CHECK_ERROR',
        message: 'Failed to check eligibility'
      }
    });
  }
});

export default router;
