import axios from 'axios';
import { logger } from '../utils/logger';

// Lazy getter — dotenv loads after imports
function getApiKey() { return process.env.OPENWEATHER_API_KEY || ''; }
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

interface WeatherForecast {
  date: string;
  temperature: { min: number; max: number; unit: string };
  rainfall: { probability: number; amount: number };
  wind: { speed: number; direction: string };
  humidity: number;
  condition: string;
  icon: string;
  advisory: string;
}

/**
 * Get current weather for a location
 */
export async function getCurrentWeather(location: string) {
  try {
    // Try as city name first, then as pincode (India)
    const isNumeric = /^\d+$/.test(location);
    const params = isNumeric
      ? { zip: `${location},in`, appid: getApiKey(), units: 'metric' }
      : { q: `${location},in`, appid: getApiKey(), units: 'metric' };

    const response = await axios.get(`${BASE_URL}/weather`, { params });
    const data = response.data;

    return {
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      condition: data.weather[0].description,
      icon: data.weather[0].icon,
      windSpeed: Math.round(data.wind.speed * 3.6), // m/s to km/h
      windDirection: degToDirection(data.wind.deg),
      rainfall: data.rain?.['1h'] || 0,
      location: data.name,
      country: data.sys.country,
    };
  } catch (error: any) {
    logger.error('OpenWeatherMap current error:', error.response?.data || error.message);
    throw new Error('Failed to fetch current weather');
  }
}

/**
 * Get 5-day / 3-hour forecast and aggregate to daily
 */
export async function getForecast(location: string, days = 7): Promise<WeatherForecast[]> {
  try {
    const isNumeric = /^\d+$/.test(location);
    const params = isNumeric
      ? { zip: `${location},in`, appid: getApiKey(), units: 'metric', cnt: days * 8 }
      : { q: `${location},in`, appid: getApiKey(), units: 'metric', cnt: days * 8 };

    const response = await axios.get(`${BASE_URL}/forecast`, { params });
    const data = response.data;

    // Aggregate 3-hour intervals into daily
    const dailyMap = new Map<string, any[]>();
    for (const item of data.list) {
      const date = item.dt_txt.split(' ')[0];
      if (!dailyMap.has(date)) dailyMap.set(date, []);
      dailyMap.get(date)!.push(item);
    }

    const forecasts: WeatherForecast[] = [];
    for (const [date, items] of dailyMap) {
      if (forecasts.length >= days) break;

      const temps = items.map((i: any) => i.main.temp);
      const humidities = items.map((i: any) => i.main.humidity);
      const rains = items.map((i: any) => i.rain?.['3h'] || 0);
      const winds = items.map((i: any) => i.wind.speed);
      const conditions = items.map((i: any) => i.weather[0].description);
      const rainProb = items.filter((i: any) => (i.pop || 0) > 0.3).length / items.length;

      const avgTemp = (Math.min(...temps) + Math.max(...temps)) / 2;
      const totalRain = rains.reduce((a: number, b: number) => a + b, 0);

      forecasts.push({
        date,
        temperature: {
          min: Math.round(Math.min(...temps)),
          max: Math.round(Math.max(...temps)),
          unit: 'celsius',
        },
        rainfall: {
          probability: Math.round(rainProb * 100),
          amount: Math.round(totalRain * 10) / 10,
        },
        wind: {
          speed: Math.round((winds.reduce((a: number, b: number) => a + b, 0) / winds.length) * 3.6),
          direction: degToDirection(items[0].wind.deg),
        },
        humidity: Math.round(humidities.reduce((a: number, b: number) => a + b, 0) / humidities.length),
        condition: mostFrequent(conditions),
        icon: items[Math.floor(items.length / 2)].weather[0].icon,
        advisory: generateAdvisory(avgTemp, totalRain, rainProb, Math.round(humidities.reduce((a: number, b: number) => a + b, 0) / humidities.length)),
      });
    }

    return forecasts;
  } catch (error: any) {
    logger.error('OpenWeatherMap forecast error:', error.response?.data || error.message);
    throw new Error('Failed to fetch weather forecast');
  }
}

// Generate farming advisory based on weather conditions
function generateAdvisory(temp: number, rain: number, rainProb: number, humidity: number): string {
  const advisories: string[] = [];

  if (rain > 10) {
    advisories.push('Heavy rain expected. Postpone pesticide application and outdoor spraying.');
  } else if (rain > 2) {
    advisories.push('Light rain expected. Good for crop growth but avoid harvesting.');
  } else if (rainProb < 0.2) {
    advisories.push('Dry day — ensure irrigation is maintained.');
  }

  if (temp > 38) {
    advisories.push('Extreme heat warning. Provide shade for sensitive crops and increase irrigation.');
  } else if (temp > 32) {
    advisories.push('Hot day. Monitor crops for heat stress. Water in early morning or evening.');
  } else if (temp < 10) {
    advisories.push('Cold weather. Protect seedlings from frost.');
  }

  if (humidity > 80) {
    advisories.push('High humidity may increase fungal disease risk. Monitor crops closely.');
  }

  return advisories.length > 0 ? advisories.join(' ') : 'Good farming conditions. Continue normal operations.';
}

function degToDirection(deg: number): string {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(deg / 45) % 8];
}

function mostFrequent(arr: string[]): string {
  const counts = new Map<string, number>();
  arr.forEach(v => counts.set(v, (counts.get(v) || 0) + 1));
  let max = 0, result = arr[0];
  counts.forEach((count, val) => { if (count > max) { max = count; result = val; } });
  return result;
}

export default { getCurrentWeather, getForecast };
