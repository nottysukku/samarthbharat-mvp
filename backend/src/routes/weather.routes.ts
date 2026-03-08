import { Router } from 'express';
import { getCurrentWeather, getForecast } from '../services/weather';
import { cacheService } from '../config/redis';
import { logger } from '../utils/logger';

const router = Router();

router.get('/current', async (req, res) => {
  try {
    const location = (req.query.location as string) || 'Delhi';

    // Check cache first
    const cached = await cacheService.get(`weather:current:${location}`);
    if (cached) {
      return res.json(cached);
    }

    const weather = await getCurrentWeather(location);
    
    // Cache for 30 minutes
    await cacheService.set(`weather:current:${location}`, weather, 1800);

    res.json(weather);
  } catch (error: any) {
    logger.error('Weather current error:', error.message);
    // Fallback to mock data if API fails
    res.json({
      temp: 28,
      feelsLike: 30,
      humidity: 65,
      condition: 'partly cloudy',
      icon: '02d',
      windSpeed: 12,
      windDirection: 'NW',
      rainfall: 0,
      location: (req.query.location as string) || 'Delhi',
      country: 'IN',
      _mock: true,
    });
  }
});

router.get('/forecast', async (req, res) => {
  const location = (req.query.location as string) || 'Delhi';
  const days = parseInt(req.query.days as string) || 7;
  try {

    // Check cache first
    const cached = await cacheService.get(`weather:forecast:${location}:${days}`);
    if (cached) {
      return res.json({ location, forecast: cached, _cached: true });
    }

    const forecast = await getForecast(location, days);
    
    // Cache for 3 hours
    await cacheService.set(`weather:forecast:${location}:${days}`, forecast, 10800);

    res.json({ location, forecast });
  } catch (error: any) {
    logger.error('Weather forecast error:', error.message);
    // Fallback mock
    const mockForecast = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      mockForecast.push({
        date: date.toISOString().split('T')[0],
        temperature: { min: 18 + Math.floor(Math.random() * 5), max: 28 + Math.floor(Math.random() * 8), unit: 'celsius' },
        rainfall: { probability: Math.floor(Math.random() * 100), amount: Math.random() * 20 },
        wind: { speed: 10 + Math.floor(Math.random() * 15), direction: 'NW' },
        humidity: 50 + Math.floor(Math.random() * 30),
        condition: 'partly cloudy',
        icon: '02d',
        advisory: 'Good farming conditions. Continue normal operations.',
      });
    }
    res.json({ location: location || 'Your Location', forecast: mockForecast, _mock: true });
  }
});

export default router;
