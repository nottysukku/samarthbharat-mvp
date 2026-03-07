import { Router } from 'express';
import mandiPrices from '../data/mockMandiPrices.json';

const router = Router();

router.get('/prices', async (req, res) => {
  try {
    const { location, crop, date } = req.query;
    
    // TODO: Replace with real scraping from https://www.commodityonline.com/
    // const prices = await commodityScraperService.getPrices(location, crop);
    
    let filteredPrices = [...mandiPrices];
    
    // Filter by location (state or district)
    if (location) {
      const locationLower = (location as string).toLowerCase();
      filteredPrices = filteredPrices.filter(price =>
        price.state.toLowerCase().includes(locationLower) ||
        price.district.toLowerCase().includes(locationLower) ||
        price.market.toLowerCase().includes(locationLower)
      );
    }
    
    // Filter by crop
    if (crop) {
      const cropLower = (crop as string).toLowerCase();
      filteredPrices = filteredPrices.filter(price =>
        price.crop.toLowerCase().includes(cropLower)
      );
    }
    
    // Calculate nearest market (mock)
    const nearestMarket = filteredPrices.length > 0 ? {
      name: filteredPrices[0].market,
      distance: Math.floor(Math.random() * 50) + 5 // Random distance 5-55 km
    } : undefined;
    
    res.json({
      prices: filteredPrices,
      nearestMarket
    });
  } catch (error) {
    res.status(500).json({
      error: {
        code: 'MANDI_PRICE_ERROR',
        message: 'Failed to fetch mandi prices'
      }
    });
  }
});

export default router;
