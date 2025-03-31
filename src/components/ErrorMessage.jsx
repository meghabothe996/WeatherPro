import { useTheme } from '../contexts/ThemeContext';
import { FaExclamationTriangle } from 'react-icons/fa';

const ErrorMessage = ({ message }) => {
  const { darkMode } = useTheme();
  
  return (
    <div className={`error-message ${darkMode ? 'dark' : 'light'}`}>
      <FaExclamationTriangle className="error-icon" />
      <p>{message || 'An error occurred while fetching weather data.'}</p>
    </div>
  );
};

export default ErrorMessage; 