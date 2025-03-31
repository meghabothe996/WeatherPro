import { useState, useEffect } from 'react';
import { cities, generateWeatherData, generateAllCitiesWeather } from '../data/weatherData';

export const useWeather = () => {
  const [allCitiesWeather, setAllCitiesWeather] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Initialize with all cities weather data
  useEffect(() => {
    try {
      const weatherData = generateAllCitiesWeather();
      setAllCitiesWeather(weatherData);
      
      // Set default city to the first one
      if (weatherData.length > 0 && !currentWeather) {
        const data = weatherData[0];
        setCurrentWeather(data);
        setHourlyForecast(data.hourlyForecast || []);
        setDailyForecast(data.dailyForecast || []);
        setSelectedCity(cities[0]);
      }
      
      setLoading(false);
    } catch (err) {
      setError('Failed to load weather data');
      setLoading(false);
    }
  }, []);

  // Function to change the selected city
  const changeCity = (cityId) => {
    setLoading(true);
    
    try {
      const city = cities.find(c => c.id === cityId);
      if (!city) {
        throw new Error('City not found');
      }
      
      setSelectedCity(city);
      const weather = generateWeatherData(city);
      setCurrentWeather(weather);
      setHourlyForecast(weather.hourlyForecast || []);
      setDailyForecast(weather.dailyForecast || []);
      setLoading(false);
    } catch (err) {
      setError('Failed to load weather data for selected city');
      setLoading(false);
    }
  };

  // Function to get user's location
  const getLocation = () => {
    setLoading(true);
    setError(null);
    
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Find the nearest city from our dummy data
        const { latitude, longitude } = position.coords;
        
        // Simple distance calculation to find nearest city
        const nearest = cities.reduce((closest, city) => {
          const distance = Math.sqrt(
            Math.pow(city.latitude - latitude, 2) + 
            Math.pow(city.longitude - longitude, 2)
          );
          
          if (distance < closest.distance) {
            return { city, distance };
          }
          return closest;
        }, { city: null, distance: Infinity });
        
        if (nearest.city) {
          changeCity(nearest.city.id);
        } else {
          setError('No nearby cities found');
          setLoading(false);
        }
      },
      (error) => {
        setError(`Unable to get location: ${error.message}`);
        setLoading(false);
      }
    );
  };

  // Search functionality
  const searchCity = (query) => {
    if (!query || query.trim() === '') return;
    
    setLoading(true);
    setError(null);
    setSearchQuery(query);
    
    // Find city that matches query
    const city = cities.find(c => 
      c.name.toLowerCase() === query.toLowerCase() ||
      c.name.toLowerCase().includes(query.toLowerCase())
    );
    
    if (city) {
      changeCity(city.id);
    } else {
      // Simulate API call to non-existent city
      setTimeout(() => {
        setError(`No weather data found for "${query}"`);
        setLoading(false);
      }, 500);
    }
  };

  // Filter cities based on search query
  const filteredCities = cities.filter(city => 
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    currentWeather,
    hourlyForecast,
    dailyForecast,
    loading,
    error,
    selectedCity,
    cities: filteredCities,
    allCitiesWeather,
    changeCity,
    searchCity,
    searchQuery,
    getLocation
  };
}; 