import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">Loading weather data...</p>
    </div>
  );
};

export default LoadingSpinner; 