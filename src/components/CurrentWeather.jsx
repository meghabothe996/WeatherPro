import React from 'react';
import { IoLocationSharp } from 'react-icons/io5';
import { 
  WiThermometer, 
  WiHumidity, 
  WiStrongWind, 
  WiBarometer,
  WiRaindrop,
  WiSunrise,
  WiSunset,
  WiDayCloudyGusts,
  WiTime3
} from 'react-icons/wi';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';

const CurrentWeather = ({ data }) => {
  // Function to determine which weather icon to display based on condition
  const getWeatherIcon = (condition) => {
    condition = condition.toLowerCase();
    
    if (condition.includes('cloud')) return <WiDayCloudyGusts />;
    if (condition.includes('rain')) return <WiRaindrop />;
    // Additional mappings can be added as needed
    
    // Default icon
    return <WiDayCloudyGusts />;
  };

  // Format date in a readable format
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Get location time based on longitude
  const getLocationTime = () => {
    // Calculate time offset (in a real app this would use the location's timezone)
    // For now, let's simulate different timezones based on longitude
    const now = new Date();
    const hourOffset = Math.round(data.longitude / 15); // Roughly 15 degrees per hour
    const locationTime = new Date(now.getTime() + hourOffset * 60 * 60 * 1000);
    
    return locationTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="current-weather dark">
      <div className="current-weather-header">
        <h2>
          <IoLocationSharp className="current-location-icon" />
          {data.city}, {data.country}
        </h2>
        <div className="date">
          <FaCalendarAlt style={{ marginRight: '8px' }} />
          {formatDate(data.date)}
        </div>
        <div className="date">
          <FaClock style={{ marginRight: '8px' }} />
          {getLocationTime()}
        </div>
      </div>
      
      <div className="current-weather-main">
        <div className="current-temp">
          <div className="temp-value">{Math.round(data.temperature)}</div>
          <div className="condition">
            <span className="condition-icon">{getWeatherIcon(data.condition)}</span>
            <span className="condition-text">{data.condition}</span>
          </div>
        </div>
        
        <div className="feels-like">
          <span>
            <WiThermometer />
            Feels like: {Math.round(data.feelsLike)}°C
          </span>
          <span>
            <WiHumidity />
            Humidity: {data.humidity}%
          </span>
        </div>
      </div>
      
      <div className="weather-details">
        <div className="detail-item">
          <WiStrongWind className="detail-icon" />
          <div className="detail-info">
            <div className="detail-label">Wind Speed</div>
            <div className="detail-value">{data.windSpeed} km/h</div>
          </div>
        </div>
        
        <div className="detail-item">
          <WiBarometer className="detail-icon" />
          <div className="detail-info">
            <div className="detail-label">Pressure</div>
            <div className="detail-value">{data.pressure} hPa</div>
          </div>
        </div>
        
        <div className="detail-item">
          <WiHumidity className="detail-icon" />
          <div className="detail-info">
            <div className="detail-label">Humidity</div>
            <div className="detail-value">{data.humidity}%</div>
          </div>
        </div>
        
        <div className="detail-item">
          <WiRaindrop className="detail-icon" />
          <div className="detail-info">
            <div className="detail-label">Rain Chance</div>
            <div className="detail-value">{data.rainChance}%</div>
          </div>
        </div>
      </div>
      
      <div className="sun-times">
        <div className="sun-item">
          <WiSunrise className="sun-icon" />
          <div className="sun-info">
            <div className="sun-label">Sunrise</div>
            <div className="sun-value">{data.sunrise}</div>
          </div>
        </div>
        
        <div className="sun-item">
          <WiSunset className="sun-icon" />
          <div className="sun-info">
            <div className="sun-label">Sunset</div>
            <div className="sun-value">{data.sunset}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather; 