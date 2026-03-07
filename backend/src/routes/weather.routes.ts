import { Router } from 'express';

const router = Router();

router.get('/forecast', async (req, res) => {
  try {
    const { location, days = '7' } = req.query;
    
    // TODO: Replace with real OpenWeatherMap API
    // const forecast = await weatherService.getForecast(location, days);
    
    // Mock 7-day forecast
    const mockForecast = [];
    const today = new Date();
    
    for (let i = 0; i < parseInt(days as string); i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      
      mockForecast.push({
        date: date.toISOString().split('T')[0],
        temperature: {
          min: 18 + Math.floor(Math.random() * 5),
          max: 28 + Math.floor(Math.random() * 8),
          unit: 'celsius'
        },
        rainfall: {
          probability: Math.floor(Math.random() * 100),
          amount: Math.random() * 20
        },
        wind: {
          speed: 10 + Math.floor(Math.random() * 15),
          direction: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)]
        },
        advisory: i === 0 
          ? 'Good day for sowing. Soil moisture is adequate.'
          : i < 3
          ? 'Continue irrigation as per schedule. Monitor for pests.'
          : 'Light rain expected. Postpone pesticide application.'
      });
    }
    
    res.json({
      location: location || 'Your Location',
      forecast: mockForecast
    });
  } catch (error) {
    res.status(500).json({
      error: {
        code: 'WEATHER_FETCH_ERROR',
        message: 'Failed to fetch weather forecast'
      }
    });
  }
});

export default router;
