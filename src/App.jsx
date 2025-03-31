import { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import WeatherTrends from './components/WeatherTrends';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { useWeather } from './hooks/useWeather';
import './App.css';

// Create a separate component for the app content to use the theme context
const AppContent = () => {
  const { darkMode } = useTheme();
  const { 
    currentWeather, 
    hourlyForecast, 
    dailyForecast, 
    loading, 
    error, 
    searchCity, 
    getLocation 
  } = useWeather();

  // Format location time
  const getLocationTime = () => {
    if (!currentWeather) return null;
    
    // Calculate time offset (in a real app this would use the location's timezone)
    // For now, let's simulate different timezones based on longitude
    const now = new Date();
    const hourOffset = Math.round(currentWeather.longitude / 15); // Roughly 15 degrees per hour
    const locationTime = new Date(now.getTime() + hourOffset * 60 * 60 * 1000);
    
    return locationTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="app dark-mode">
      <Header 
        onSearch={searchCity} 
        getLocation={getLocation} 
      />
      
      <div className="dashboard">
        {loading && <LoadingSpinner />}
        
        {error && <ErrorMessage message={error} />}
        
        {!loading && !error && currentWeather && (
          <>
            <div className="fade-in">
              <CurrentWeather data={currentWeather} darkMode={true} />
            </div>
            
            <div className="forecast-container fade-in">
              <HourlyForecast data={hourlyForecast} darkMode={true} />
              <DailyForecast data={dailyForecast} darkMode={true} />
            </div>
            
            <div className="climate-analysis fade-in">
              <WeatherTrends data={currentWeather} />
            </div>
          </>
        )}
      </div>
      
      <footer className="footer dark">
        <div className="footer-content">
          <p className="copyright">© {new Date().getFullYear()} Weather Dashboard | Real-Time Weather Information At Your Fingertips</p>
          <p className="developer-info">
            Developed by <a href="https://www.linkedin.com/in/meghabothe/" target="_blank" rel="noopener noreferrer">Megha Bothe</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

// Main App component wrapped with ThemeProvider
const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
