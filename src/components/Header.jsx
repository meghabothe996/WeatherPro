import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaLocationArrow, FaCloudSun } from 'react-icons/fa';
import { WiDaySunny } from 'react-icons/wi';
import { useTheme } from '../contexts/ThemeContext';

const Header = ({ onSearch, getLocation }) => {
  const { darkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [cities, setCities] = useState([
    'London', 'New York', 'Tokyo', 'Paris', 'Sydney', 'Berlin', 'Moscow'
  ]);
  
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          inputRef.current && !inputRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowDropdown(e.target.value.length > 0);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      setSearchTerm('');
      setShowDropdown(false);
    }
  };

  const handleCitySelect = (city) => {
    onSearch(city);
    setSearchTerm('');
    setShowDropdown(false);
  };

  const handleGetLocation = () => {
    getLocation();
    setSearchTerm('');
    setShowDropdown(false);
  };

  const filteredCities = cities.filter(city => 
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="header dark">
      <div className="logo">
        <FaCloudSun />
        <h1>WeatherPro</h1>
      </div>
      
      <div className="search-container">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <div className="search-input-wrapper" ref={inputRef}>
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search city..."
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => searchTerm && setShowDropdown(true)}
            />
            
            <FaLocationArrow 
              className="location-icon" 
              onClick={handleGetLocation}
              title="Use current location"
            />
            
            {showDropdown && filteredCities.length > 0 && (
              <div className="search-dropdown" ref={dropdownRef}>
                {filteredCities.map((city, index) => (
                  <div 
                    key={index} 
                    className="search-dropdown-item"
                    onClick={() => handleCitySelect(city)}
                  >
                    <WiDaySunny className="dropdown-icon" />
                    {city}
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Header; 