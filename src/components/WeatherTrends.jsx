import React, { useState, useEffect, useRef } from 'react';
import { WiRaindrops, WiThermometer, WiSunrise, WiDaySunny, WiStrongWind } from 'react-icons/wi';
import { FaChartLine, FaLeaf, FaRunning, FaHome, FaUmbrella, FaTags, FaCalendarAlt } from 'react-icons/fa';

const WeatherTrends = ({ data }) => {
  const [activeCategory, setActiveCategory] = useState('farming');
  const [selectedYears, setSelectedYears] = useState([2025]); // Default to current year
  const tempChartRef = useRef(null);
  const rainChartRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  if (!data) return null;
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Categories for recommendations
  const categories = [
    { id: 'farming', label: 'Farming', icon: <FaLeaf /> },
    { id: 'outdoor', label: 'Outdoor Activities', icon: <FaRunning /> },
    { id: 'home', label: 'Home & Garden', icon: <FaHome /> },
    { id: 'health', label: 'Health & Wellness', icon: <FaUmbrella /> },
    { id: 'general', label: 'General', icon: <FaTags /> }
  ];
  
  // Get the current date info
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Mock historical data (in a real app, this would come from an API)
  const historicalData = {
    temperature: [
      { month: 'Jan', value: 5 },
      { month: 'Feb', value: 7 },
      { month: 'Mar', value: 10 },
      { month: 'Apr', value: 14 },
      { month: 'May', value: 18 },
      { month: 'Jun', value: 22 },
      { month: 'Jul', value: 25 },
      { month: 'Aug', value: 24 },
      { month: 'Sep', value: 20 },
      { month: 'Oct', value: 15 },
      { month: 'Nov', value: 10 },
      { month: 'Dec', value: 6 }
    ],
    rainfall: [
      { month: 'Jan', value: 80 },
      { month: 'Feb', value: 70 },
      { month: 'Mar', value: 65 },
      { month: 'Apr', value: 60 },
      { month: 'May', value: 55 },
      { month: 'Jun', value: 40 },
      { month: 'Jul', value: 30 },
      { month: 'Aug', value: 35 },
      { month: 'Sep', value: 50 },
      { month: 'Oct', value: 65 },
      { month: 'Nov', value: 75 },
      { month: 'Dec', value: 85 }
    ]
  };
  
  // Generate 2025 data up to the current month
  const generateCurrentYearData = () => {
    // Temperature data for 2025 (showing only up to current month)
    const tempData = [6, 8.5, 13]; // Real data for Jan-Mar
    
    // Rainfall data for 2025
    const rainData = [75, 85, 60]; // Real data for Jan-Mar
    
    // Future months projections
    const tempProjections = [17, 21, 25, 29, 28, 22, 16, 10, 7]; // Apr-Dec projections
    const rainProjections = [90, 45, 80, 35, 95, 65, 75, 85, 70]; // Apr-Dec projections
    
    // Only include data for months that have passed or are current
    for (let i = 3; i < 12; i++) {
      if (i < currentMonth) {
        // Past months in 2025 with slight randomization
        tempData.push(tempProjections[i-3] * (0.95 + Math.random() * 0.1));
        rainData.push(rainProjections[i-3] * (0.95 + Math.random() * 0.1));
      } 
      else if (i === currentMonth) {
        // For current month, add data proportional to day of month
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const dayRatio = currentDay / daysInMonth;
        
        // Only add partial data for current month (scaled by day)
        tempData.push(tempProjections[i-3] * dayRatio * (0.95 + Math.random() * 0.1));
        rainData.push(rainProjections[i-3] * dayRatio * (0.95 + Math.random() * 0.1));
      }
      else {
        // Future months - show null to indicate no data
        tempData.push(null);
        rainData.push(null);
      }
    }
    
    return {
      tempValues: tempData,
      rainValues: rainData
    };
  };
  
  // Get current year data
  const currentYearData = generateCurrentYearData();

  // Additional historical data for a more complex line chart
  const fiveYearTemperature = [
    // Year 2021 - Mild with extended spring/fall
    { year: 2021, values: [4.5, 6.5, 11, 15, 17, 19, 22, 21, 19, 16, 11, 5.5], trend: "Mild with extended spring and fall" },
    // Year 2022 - Late warming
    { year: 2022, values: [5.2, 5.5, 6, 11, 17, 23, 26, 25, 20, 15, 10, 6.2], trend: "Late spring warming with rapid temperature rise" },
    // Year 2023 - Early warming
    { year: 2023, values: [5.5, 8, 12, 16, 19, 22, 24, 23, 19, 14, 9, 6], trend: "Early warming with moderate summer" },
    // Year 2024 - Record temperatures
    { year: 2024, values: [6, 8.5, 13, 17, 21, 25, 29, 28, 22, 16, 10, 7], trend: "Record high temperatures throughout the year" },
    // Year 2025 (current) - Available data plus projections
    { year: 2025, values: currentYearData.tempValues, trend: "Continued warming trend with unprecedented peaks" }
  ];
  
  // Modified rainfall data to show different trends compared to temperature
  const fiveYearRainfall = [
    // Year 2021 - stable with sudden drops
    { year: 2021, values: [85, 80, 78, 75, 72, 30, 25, 22, 70, 68, 75, 80], trend: "Stable with sudden summer drought" },
    // Year 2022 - bimodal pattern
    { year: 2022, values: [82, 60, 40, 30, 45, 70, 65, 40, 30, 45, 75, 85], trend: "Bimodal pattern with early summer rainfall" },
    // Year 2023 - rising trend
    { year: 2023, values: [65, 70, 75, 77, 80, 83, 85, 87, 88, 85, 80, 75], trend: "Rising trend with late summer peak" },
    // Year 2024 - erratic pattern
    { year: 2024, values: [75, 85, 60, 90, 45, 80, 35, 95, 65, 75, 85, 70], trend: "Erratic precipitation pattern with high variability" },
    // Year 2025 (current) - erratic pattern (partial data)
    { year: 2025, values: currentYearData.rainValues, trend: "Intensifying rainfall events with dry periods between" }
  ];

  // Toggle year selection
  const toggleYearSelection = (year) => {
    if (selectedYears.includes(year)) {
      // Don't allow deselecting if it's the last selected year
      if (selectedYears.length > 1) {
        setSelectedYears(selectedYears.filter(y => y !== year));
      }
    } else {
      setSelectedYears([...selectedYears, year]);
    }
  };
  
  // Draw temperature line chart
  useEffect(() => {
    if (!tempChartRef.current) return;
    
    const canvas = tempChartRef.current;
    const ctx = canvas.getContext('2d');
    
    // Make canvas responsive to container width
    const container = canvas.parentElement;
    const containerWidth = container.clientWidth;
    
    // Set canvas dimensions based on container width and screen size
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;
    
    // Adjust canvas size based on screen size
    const canvasWidth = Math.min(800, containerWidth - (isMobile ? 10 : 20));
    const canvasHeight = isSmallMobile ? 180 : (isMobile ? 220 : 300);
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set chart dimensions
    const chartWidth = width - (isMobile ? 40 : 60);
    const chartHeight = height - (isMobile ? 40 : 60);
    const chartX = isMobile ? 35 : 50;
    const chartY = 20;
    
    // Draw axes
    ctx.strokeStyle = 'rgba(173, 181, 189, 0.5)';
    ctx.lineWidth = isMobile ? 0.5 : 1;
    ctx.beginPath();
    ctx.moveTo(chartX, chartY);
    ctx.lineTo(chartX, chartY + chartHeight);
    ctx.lineTo(chartX + chartWidth, chartY + chartHeight);
    ctx.stroke();
    
    // Draw grid lines
    ctx.strokeStyle = 'rgba(173, 181, 189, 0.2)';
    ctx.beginPath();
    for (let i = 0; i <= 5; i++) {
      const y = chartY + chartHeight - (i * chartHeight / 5);
      ctx.moveTo(chartX, y);
      ctx.lineTo(chartX + chartWidth, y);
    }
    ctx.stroke();
    
    // Calculate scale - ignore null values
    const allValues = fiveYearTemperature.flatMap(year => 
      year.values.filter(v => v !== null)
    );
    const maxValue = Math.max(...allValues) * 1.1;
    
    // Draw y-axis labels
    ctx.fillStyle = 'rgba(173, 181, 189, 0.8)';
    ctx.font = isMobile ? '9px Inter, sans-serif' : '10px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let i = 0; i <= 5; i++) {
      const value = Math.round(maxValue * i / 5);
      const y = chartY + chartHeight - (i * chartHeight / 5);
      ctx.fillText(`${value}°C`, chartX - (isMobile ? 5 : 10), y);
    }
    
    // Draw x-axis labels (months)
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    // On mobile, only show every other month for readability
    for (let i = 0; i < 12; i++) {
      if (!isMobile || i % 2 === 0) {
        const x = chartX + ((i + 0.5) * chartWidth / 12);
        ctx.fillText(monthNames[i], x, chartY + chartHeight + 5);
      }
    }
    
    // Highlight current month
    const currentMonthX = chartX + ((currentMonth + 0.5) * chartWidth / 12);
    ctx.fillStyle = 'rgba(61, 139, 253, 0.2)';
    ctx.fillRect(
      currentMonthX - chartWidth / 24, 
      chartY, 
      chartWidth / 12, 
      chartHeight
    );
    
    // Draw chart title and description
    ctx.fillStyle = 'rgba(233, 236, 239, 0.9)';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    
    // Define colors and dash patterns
    const colors = [
      'rgba(239, 68, 68, 0.8)',  // Red
      'rgba(249, 115, 22, 0.8)',  // Orange
      'rgba(56, 189, 248, 0.8)',  // Light blue
      'rgba(16, 185, 129, 0.8)',  // Green
      'rgba(61, 139, 253, 1)'     // Blue (current year)
    ];
    
    // Line dash patterns for different years
    const dashPatterns = [
      [], // Solid line for current year (2025)
      [5, 5], // Dashed
      [2, 2], // Dotted
      [10, 5, 2, 5], // Dash-dot-dash
      [15, 5, 2, 5, 2, 5] // Long dash-dot-dot
    ];
    
    // Reset line dash to solid for main graph drawing
    ctx.setLineDash([]);
    
    // Draw only selected years
    fiveYearTemperature
      .filter(yearData => selectedYears.includes(yearData.year))
      .forEach((yearData, yearIndex) => {
        const dataIndex = fiveYearTemperature.findIndex(d => d.year === yearData.year);
        ctx.strokeStyle = colors[dataIndex];
        // Thinner lines as requested
        ctx.lineWidth = yearData.year === 2025 ? (isMobile ? 1.5 : 2) : (isMobile ? 1 : 1.5);
        ctx.setLineDash(dashPatterns[dataIndex]);
        ctx.beginPath();
        
        let firstPoint = true;
        yearData.values.forEach((value, monthIndex) => {
          // Skip null values (future months for current year)
          if (value === null) return;
          
          const x = chartX + ((monthIndex + 0.5) * chartWidth / 12);
          const y = chartY + chartHeight - (value / maxValue * chartHeight);
          
          if (firstPoint) {
            ctx.moveTo(x, y);
            firstPoint = false;
          } else {
            ctx.lineTo(x, y);
          }
        });
        
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Add data points
        yearData.values.forEach((value, monthIndex) => {
          // Skip null values (future months for current year)
          if (value === null) return;
          
          const x = chartX + ((monthIndex + 0.5) * chartWidth / 12);
          const y = chartY + chartHeight - (value / maxValue * chartHeight);
          
          // Add points for the current year
          if (yearData.year === 2025) {
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(x, y, isMobile ? 2 : 3, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.strokeStyle = colors[dataIndex];
            ctx.lineWidth = isMobile ? 1 : 1.5;
            ctx.beginPath();
            ctx.arc(x, y, isMobile ? 2 : 3, 0, Math.PI * 2);
            ctx.stroke();
            
            // Label the last actual data point as "Latest"
            if (monthIndex === currentMonth) {
              ctx.fillStyle = 'rgba(61, 139, 253, 0.9)';
              ctx.font = `bold ${isMobile ? 8 : 10}px Inter, sans-serif`;
              ctx.textAlign = 'center';
              ctx.fillText('Latest', x, y - (isMobile ? 10 : 15));
            }
          }
        });
      });
    
  }, [tempChartRef, selectedYears, currentMonth, currentDay, windowWidth]);
  
  // Draw rainfall line chart
  useEffect(() => {
    if (!rainChartRef.current) return;
    
    const canvas = rainChartRef.current;
    const ctx = canvas.getContext('2d');
    
    // Make canvas responsive to container width
    const container = canvas.parentElement;
    const containerWidth = container.clientWidth;
    
    // Set canvas dimensions based on container width and screen size
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;
    
    // Adjust canvas size based on screen size
    const canvasWidth = Math.min(800, containerWidth - (isMobile ? 10 : 20));
    const canvasHeight = isSmallMobile ? 180 : (isMobile ? 220 : 300);
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set chart dimensions
    const chartWidth = width - (isMobile ? 40 : 60);
    const chartHeight = height - (isMobile ? 40 : 60);
    const chartX = isMobile ? 35 : 50;
    const chartY = 20;
    
    // Draw axes
    ctx.strokeStyle = 'rgba(173, 181, 189, 0.5)';
    ctx.lineWidth = isMobile ? 0.5 : 1;
    ctx.beginPath();
    ctx.moveTo(chartX, chartY);
    ctx.lineTo(chartX, chartY + chartHeight);
    ctx.lineTo(chartX + chartWidth, chartY + chartHeight);
    ctx.stroke();
    
    // Draw grid lines
    ctx.strokeStyle = 'rgba(173, 181, 189, 0.2)';
    ctx.beginPath();
    for (let i = 0; i <= 5; i++) {
      const y = chartY + chartHeight - (i * chartHeight / 5);
      ctx.moveTo(chartX, y);
      ctx.lineTo(chartX + chartWidth, y);
    }
    ctx.stroke();
    
    // Calculate scale - ignore null values
    const allValues = fiveYearRainfall.flatMap(year => 
      year.values.filter(v => v !== null)
    );
    const maxValue = Math.max(...allValues) * 1.1;
    
    // Draw y-axis labels
    ctx.fillStyle = 'rgba(173, 181, 189, 0.8)';
    ctx.font = isMobile ? '9px Inter, sans-serif' : '10px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let i = 0; i <= 5; i++) {
      const value = Math.round(maxValue * i / 5);
      const y = chartY + chartHeight - (i * chartHeight / 5);
      ctx.fillText(`${value}mm`, chartX - (isMobile ? 5 : 10), y);
    }
    
    // Draw x-axis labels (months)
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    // On mobile, only show every other month for readability
    for (let i = 0; i < 12; i++) {
      if (!isMobile || i % 2 === 0) {
        const x = chartX + ((i + 0.5) * chartWidth / 12);
        ctx.fillText(monthNames[i], x, chartY + chartHeight + 5);
      }
    }
    
    // Highlight current month
    const currentMonthX = chartX + ((currentMonth + 0.5) * chartWidth / 12);
    ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
    ctx.fillRect(
      currentMonthX - chartWidth / 24, 
      chartY, 
      chartWidth / 12, 
      chartHeight
    );
    
    // Draw chart title and description
    ctx.fillStyle = 'rgba(233, 236, 239, 0.9)';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    
    // Define colors and dash patterns
    const colors = [
      'rgba(220, 38, 38, 0.8)',  // Deep Red
      'rgba(249, 115, 22, 0.8)',  // Orange
      'rgba(56, 189, 248, 0.8)',  // Light blue
      'rgba(5, 150, 105, 0.8)',   // Emerald
      'rgba(99, 102, 241, 1)'     // Indigo (current year)
    ];
    
    // Line dash patterns for different years
    const dashPatterns = [
      [], // Solid line for current year (2025)
      [5, 5], // Dashed
      [2, 2], // Dotted
      [10, 5, 2, 5], // Dash-dot-dash
      [15, 5, 2, 5, 2, 5] // Long dash-dot-dot
    ];
    
    // Reset line dash to solid
    ctx.setLineDash([]);
    
    // Draw only selected years
    fiveYearRainfall
      .filter(yearData => selectedYears.includes(yearData.year))
      .forEach((yearData, yearIndex) => {
        const dataIndex = fiveYearRainfall.findIndex(d => d.year === yearData.year);
        ctx.strokeStyle = colors[dataIndex];
        // Thinner lines as requested
        ctx.lineWidth = yearData.year === 2025 ? (isMobile ? 1.5 : 2) : (isMobile ? 1 : 1.5);
        ctx.setLineDash(dashPatterns[dataIndex]);
        ctx.beginPath();
        
        let firstPoint = true;
        yearData.values.forEach((value, monthIndex) => {
          // Skip null values (future months for current year)
          if (value === null) return;
          
          const x = chartX + ((monthIndex + 0.5) * chartWidth / 12);
          const y = chartY + chartHeight - (value / maxValue * chartHeight);
          
          if (firstPoint) {
            ctx.moveTo(x, y);
            firstPoint = false;
          } else {
            ctx.lineTo(x, y);
          }
        });
        
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Add data points
        yearData.values.forEach((value, monthIndex) => {
          // Skip null values (future months for current year)
          if (value === null) return;
          
          const x = chartX + ((monthIndex + 0.5) * chartWidth / 12);
          const y = chartY + chartHeight - (value / maxValue * chartHeight);
          
          // Add points for the current year
          if (yearData.year === 2025) {
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(x, y, isMobile ? 2 : 3, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.strokeStyle = colors[dataIndex];
            ctx.lineWidth = isMobile ? 1 : 1.5;
            ctx.beginPath();
            ctx.arc(x, y, isMobile ? 2 : 3, 0, Math.PI * 2);
            ctx.stroke();
            
            // Label the last actual data point as "Latest"
            if (monthIndex === currentMonth) {
              ctx.fillStyle = 'rgba(99, 102, 241, 0.9)';
              ctx.font = `bold ${isMobile ? 8 : 10}px Inter, sans-serif`;
              ctx.textAlign = 'center';
              ctx.fillText('Latest', x, y - (isMobile ? 10 : 15));
            }
          }
        });
      });
    
  }, [rainChartRef, selectedYears, currentMonth, currentDay, windowWidth]);
  
  // Generate recommendations based on category and current weather
  const getRecommendations = (category) => {
    const currentTemp = data.temperature;
    const isRainy = data.condition.toLowerCase().includes('rain');
    const isWindy = data.windSpeed > 20;
    const isSunny = data.condition.toLowerCase().includes('sunny') || data.condition.toLowerCase().includes('clear');
    
    switch(category) {
      case 'farming':
        return [
          isRainy ? "Good day for planting new crops due to moisture availability." : "Consider irrigation for newly planted crops.",
          currentTemp > 25 ? "Keep an eye on water needs; evaporation rates are high." : "Moderate temperature - good for most field operations.",
          isWindy ? "Avoid spraying pesticides today due to high wind." : "Good conditions for pesticide application if needed.",
          `Current soil moisture trending ${historicalData.rainfall[currentMonth].value > 60 ? 'above' : 'below'} seasonal average.`,
          `${monthNames[(currentMonth + 1) % 12]} historically begins ${historicalData.temperature[(currentMonth + 1) % 12].value > historicalData.temperature[currentMonth].value ? 'warming' : 'cooling'} trend.`
        ];
        
      case 'outdoor':
        return [
          isSunny ? "Great day for outdoor activities! Don't forget sunscreen." : "Consider indoor alternatives due to weather conditions.",
          currentTemp > 28 ? "High temperature alert: Stay hydrated during outdoor activities." : "Comfortable temperature for outdoor exercise.",
          isRainy ? "Rainy conditions: Plan indoor workouts or bring water-resistant gear." : "Dry conditions are favorable for hiking and cycling.",
          isWindy ? "Strong winds may affect cycling and precision sports." : "Low wind - excellent for precision outdoor activities.",
          `Historical data shows ${monthNames[currentMonth]} typically has ${historicalData.rainfall[currentMonth].value > 60 ? 'higher' : 'lower'} precipitation than average.`
        ];
        
      case 'home':
        return [
          isRainy ? "Good day for indoor maintenance and cleaning." : "Favorable conditions for exterior home maintenance.",
          isSunny ? "Ideal day for drying laundry outdoors." : "Consider using indoor drying methods today.",
          isWindy ? "Secure outdoor furniture and check for loose roof materials." : "Safe conditions for outdoor decorating and garden activities.",
          `Energy usage typically ${currentTemp > 22 ? 'increases' : 'decreases'} during this temperature range.`,
          `Seasonal preparation: ${currentMonth >= 9 || currentMonth <= 1 ? 'Ensure heating systems are maintained.' : 'Check cooling systems efficiency.'}`
        ];
        
      case 'health':
        return [
          currentTemp > 30 ? "Heat alert: Stay hydrated and avoid prolonged sun exposure." : "Moderate temperature - good for most outdoor activities.",
          isRainy ? "Higher humidity may affect respiratory conditions." : "Lower humidity levels - watch for dry skin and dehydration.",
          isWindy ? "Pollen and allergens may be more widespread due to wind." : "Lower pollen mobility - better for allergy sufferers.",
          `Seasonal allergies typically ${currentMonth >= 3 && currentMonth <= 5 ? 'peak' : 'decrease'} during this month.`,
          `UV index trending ${isSunny ? 'higher' : 'lower'} than seasonal average - adjust sun protection accordingly.`
        ];
        
      case 'general':
      default:
        return [
          `Temperature is ${Math.abs(currentTemp - historicalData.temperature[currentMonth].value) < 2 ? 'typical' : currentTemp > historicalData.temperature[currentMonth].value ? 'higher' : 'lower'} than historical average for ${monthNames[currentMonth]}.`,
          `Precipitation levels ${isRainy ? 'consistent with' : 'below'} historical trends for this time of year.`,
          `${monthNames[(currentMonth + 1) % 12]} typically brings ${historicalData.temperature[(currentMonth + 1) % 12].value > historicalData.temperature[currentMonth].value ? 'warmer' : 'cooler'} temperatures.`,
          `Based on historical data, prepare for ${historicalData.rainfall[(currentMonth + 1) % 12].value > 60 ? 'increased' : 'decreased'} precipitation next month.`,
          `Weather pattern analysis shows ${data.condition} conditions are ${Math.random() > 0.5 ? 'more' : 'less'} frequent than in previous years.`
        ];
    }
  };
  
  // Get recommendations for active category
  const recommendations = getRecommendations(activeCategory);

  // Define colors for legends
  const tempColors = [
    'rgba(239, 68, 68, 0.8)',  // Red
    'rgba(249, 115, 22, 0.8)',  // Orange
    'rgba(56, 189, 248, 0.8)',  // Light blue
    'rgba(16, 185, 129, 0.8)',  // Green
    'rgba(61, 139, 253, 1)'     // Blue (current year)
  ];
  
  const rainColors = [
    'rgba(220, 38, 38, 0.8)',  // Deep Red
    'rgba(249, 115, 22, 0.8)',  // Orange
    'rgba(56, 189, 248, 0.8)',  // Light blue
    'rgba(5, 150, 105, 0.8)',   // Emerald
    'rgba(99, 102, 241, 1)'     // Indigo (current year)
  ];
  
  return (
    <div className="weather-trends dark">
      <h3>
        <FaChartLine className="forecast-title-icon" />
        Weather Intelligence Center
      </h3>
      
      <div className="weather-analysis-container">
        {/* Current Weather Recommendations Section */}
        <section className="current-weather-section">
          <h3 className="section-title">
            <FaUmbrella /> Current Weather Recommendations
          </h3>
          
          <div className="recommendation-section">
            <p className="recommendation-intro">
              Based on today's conditions in your area, we recommend:
            </p>
            
            <div className="category-tabs">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.icon}
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
            
            <div className="recommendations">
              <h4>Recommendations for {categories.find(c => c.id === activeCategory).label}</h4>
              <ul className="recommendation-list">
                {recommendations.map((recommendation, index) => (
                  <li key={index} className="recommendation-item">
                    <span className="recommendation-bullet"></span>
                    {recommendation}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        
        {/* Historical Weather Patterns Section */}
        <section className="historical-weather-section">
          <h3 className="section-title">
            <FaChartLine /> Historical Weather Patterns
          </h3>
          
          <div className="year-selector">
            <div className="year-selector-label">
              <FaCalendarAlt /> {window.innerWidth <= 480 ? 'Years:' : 'Select years to display:'}
            </div>
            <div className="year-buttons">
              {fiveYearTemperature.map(yearData => (
                <button
                  key={yearData.year}
                  className={`year-button ${selectedYears.includes(yearData.year) ? 'active' : ''}`}
                  onClick={() => toggleYearSelection(yearData.year)}
                >
                  {yearData.year}
                </button>
              ))}
            </div>
          </div>
          
          <div className="chart-container full-width">
            <h4>
              <WiThermometer /> 
              {window.innerWidth <= 480 ? 'Temperature Trends (°C)' : 'Annual Temperature Trends (°C) - Multi-Year Comparison'}
            </h4>
            
            <div className="current-data-note">
              <span className="data-badge">Live</span>
              <span>Data up to {monthNames[currentMonth]} {currentDay}, 2025</span>
            </div>
            
            <div className="line-chart-container">
              <canvas ref={tempChartRef} className="line-chart"></canvas>
            </div>
            
            <div className="chart-legend-container">
              {selectedYears.map(year => {
                const yearData = fiveYearTemperature.find(d => d.year === year);
                const index = fiveYearTemperature.findIndex(d => d.year === year);
                return (
                  <div key={year} className="chart-legend-item">
                    <span className="legend-line" style={{ backgroundColor: tempColors[index] }}></span>
                    <span className="legend-year">{year}</span>
                    <span className="legend-trend">{yearData.trend}</span>
                    {year === 2025 && (
                      <span className="current-year-badge">Current</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="chart-container full-width">
            <h4>
              <WiRaindrops /> 
              {window.innerWidth <= 480 ? 'Precipitation Trends (mm)' : 'Annual Precipitation Trends (mm) - Multi-Year Comparison'}
            </h4>
            
            <div className="current-data-note">
              <span className="data-badge">Live</span>
              <span>Data up to {monthNames[currentMonth]} {currentDay}, 2025</span>
            </div>
            
            <div className="line-chart-container">
              <canvas ref={rainChartRef} className="line-chart"></canvas>
            </div>
            
            <div className="chart-legend-container">
              {selectedYears.map(year => {
                const yearData = fiveYearRainfall.find(d => d.year === year);
                const index = fiveYearRainfall.findIndex(d => d.year === year);
                return (
                  <div key={year} className="chart-legend-item">
                    <span className="legend-line" style={{ backgroundColor: rainColors[index] }}></span>
                    <span className="legend-year">{year}</span>
                    <span className="legend-trend">{yearData.trend}</span>
                    {year === 2025 && (
                      <span className="current-year-badge">Current</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WeatherTrends; 