import React, { useState } from 'react';
import { WiDayCloudyGusts, WiThermometer } from 'react-icons/wi';
import { FaCalendarAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const DailyForecast = ({ data }) => {
  const [expanded, setExpanded] = useState(false);
  
  if (!data || data.length === 0) {
    return null;
  }
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
  };

  // Get weather icon based on condition
  const getWeatherIcon = (condition) => {
    return <WiDayCloudyGusts className="daily-icon" />;
  };

  // Show only first 3 days if not expanded
  const visibleData = expanded ? data : data.slice(0, 3);

  return (
    <div className="daily-forecast dark">
      <h3>
        <FaCalendarAlt className="forecast-title-icon" />
        7-Day Forecast
      </h3>
      
      <div className={`daily-items ${expanded ? 'expanded' : 'collapsed'}`}>
        {visibleData.map((day, index) => {
          const formattedDate = formatDate(day.date);
          return (
            <div 
              key={index} 
              className={`daily-item ${expanded && index >= 3 ? 'fade-in' : ''}`}
            >
              <div className="daily-date">
                <div className="daily-day">{formattedDate.day}</div>
                <div className="daily-date-value">{formattedDate.date}</div>
              </div>
              
              {getWeatherIcon(day.condition)}
              
              <div className="daily-temps">
                <div className="daily-high">
                  <WiThermometer /> {Math.round(day.maxTemp)}°
                </div>
                <div className="daily-low">
                  {Math.round(day.minTemp)}°
                </div>
              </div>
              
              <div className="daily-condition">
                {day.condition}
              </div>
            </div>
          );
        })}
      </div>
      
      {data.length > 3 && (
        <button 
          className="expand-collapse-btn"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          {expanded ? (
            <>
              <FaChevronUp className="expand-icon" />
              <span>Show Less</span>
            </>
          ) : (
            <>
              <FaChevronDown className="expand-icon" />
              <span>Show All {data.length} Days</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default DailyForecast; 