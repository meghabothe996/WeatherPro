import React from 'react';
import { WiTime9, WiDayCloudyGusts, WiThermometer } from 'react-icons/wi';

const HourlyForecast = ({ data }) => {
  if (!data || data.length === 0) {
    return null;
  }
  
  // Format hour
  const formatHour = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
  };

  // Get weather icon based on condition
  const getWeatherIcon = (condition) => {
    return <WiDayCloudyGusts className="hourly-icon" />;
  };

  // Only show 6 hours of forecast
  const limitedHourlyData = data.slice(0, 6);

  return (
    <div className="hourly-forecast dark">
      <h3>
        <WiTime9 className="forecast-title-icon" />
        Hourly Forecast
      </h3>
      
      <div className="hourly-grid">
        {limitedHourlyData.map((hour, index) => (
          <div key={index} className="hourly-item">
            <div className="hourly-time">
              {formatHour(hour.time)}
            </div>
            {getWeatherIcon(hour.condition)}
            <div className="hourly-temp">
              <WiThermometer />
              {Math.round(hour.temperature)}°
            </div>
            <div className="hourly-condition">
              {hour.condition}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast; 