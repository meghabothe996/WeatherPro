const cities = [
  {
    id: 1,
    name: "New York",
    country: "USA",
    latitude: 40.7128,
    longitude: -74.006
  },
  {
    id: 2,
    name: "London",
    country: "UK",
    latitude: 51.5074,
    longitude: -0.1278
  },
  {
    id: 3,
    name: "Tokyo",
    country: "Japan",
    latitude: 35.6762,
    longitude: 139.6503
  },
  {
    id: 4,
    name: "Sydney",
    country: "Australia",
    latitude: -33.8688,
    longitude: 151.2093
  },
  {
    id: 5,
    name: "Paris",
    country: "France",
    latitude: 48.8566,
    longitude: 2.3522
  },
  {
    id: 6,
    name: "Berlin",
    country: "Germany",
    latitude: 52.5200,
    longitude: 13.4050
  },
  {
    id: 7,
    name: "Mumbai",
    country: "India",
    latitude: 19.0760,
    longitude: 72.8777
  },
  {
    id: 8,
    name: "Cairo",
    country: "Egypt",
    latitude: 30.0444,
    longitude: 31.2357
  }
];

const weatherConditions = [
  "Sunny", "Partly Cloudy", "Cloudy", "Rain", "Thunderstorm", 
  "Snow", "Mist", "Windy", "Clear"
];

// Function to generate random weather data for a city
const generateWeatherData = (city, date = new Date()) => {
  const temp = Math.round(Math.random() * 35) + 5; // Temperature between 5 and 40
  const feelsLike = temp + (Math.random() * 5 - 2); // Feels like +/- 2 degrees
  const humidity = Math.round(Math.random() * 60) + 20; // Humidity between 20% and 80%
  const windSpeed = Math.round(Math.random() * 30) + 2; // Wind speed between 2 and 32 km/h
  const pressure = Math.round(Math.random() * 50) + 980; // Pressure between 980 and 1030 hPa
  const visibility = Math.round(Math.random() * 5) + 5; // Visibility between 5 and 10 km
  const conditionIndex = Math.floor(Math.random() * weatherConditions.length);
  const condition = weatherConditions[conditionIndex];
  const rainChance = Math.round(Math.random() * 100); // Chance of rain 0-100%
  
  return {
    city: city.name,
    country: city.country,
    latitude: city.latitude,
    longitude: city.longitude,
    date: date.toISOString(),
    temperature: {
      current: temp,
      feelsLike: parseFloat(feelsLike.toFixed(1)),
      min: temp - Math.round(Math.random() * 5),
      max: temp + Math.round(Math.random() * 5)
    },
    condition,
    humidity,
    windSpeed,
    pressure,
    visibility,
    rainChance,
    sunrise: "06:15 AM",
    sunset: "07:45 PM",
    hourlyForecast: generateHourlyForecast(temp, condition),
    dailyForecast: generateDailyForecast()
  };
};

// Generate hourly forecast
const generateHourlyForecast = (baseTemp, baseCondition) => {
  const hours = [];
  const now = new Date();
  
  for (let i = 0; i < 24; i++) {
    const time = new Date(now);
    time.setHours(now.getHours() + i);
    
    // Randomize temperature within a reasonable range
    const tempVariation = Math.random() * 8 - 4; // +/- 4 degrees
    const temp = Math.round(baseTemp + tempVariation);
    
    // Occasionally change the condition
    let condition = baseCondition;
    if (Math.random() > 0.7) {
      const conditionIndex = Math.floor(Math.random() * weatherConditions.length);
      condition = weatherConditions[conditionIndex];
    }
    
    hours.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temperature: temp,
      condition
    });
  }
  
  return hours;
};

// Generate daily forecast for the next 7 days
const generateDailyForecast = () => {
  const days = [];
  const now = new Date();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() + i);
    const dayName = dayNames[date.getDay()];
    
    days.push({
      day: dayName,
      date: date.toLocaleDateString(),
      high: Math.round(Math.random() * 15) + 20, // High temp between 20-35
      low: Math.round(Math.random() * 10) + 10, // Low temp between 10-20
      condition: weatherConditions[Math.floor(Math.random() * weatherConditions.length)]
    });
  }
  
  return days;
};

// Generate current weather for all cities
const generateAllCitiesWeather = () => {
  return cities.map(city => generateWeatherData(city));
};

export { cities, generateWeatherData, generateAllCitiesWeather }; 