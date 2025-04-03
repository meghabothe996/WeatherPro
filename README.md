# Weather Dashboard

A modern, interactive weather application built with React and Vite that provides real-time weather data, forecasts, and visualizations.

## Features

- Real-time current weather conditions display
- Daily and hourly weather forecasts
- Interactive weather data visualizations using Chart.js
- Five-year historical weather trends for temperature and precipitation
- Multi-year comparative climate analysis
- Weather pattern anomaly detection
- Customizable timeline selection for historical data
- Category-based daily recommendations for:
  - Farming and agriculture
  - Outdoor activities
  - Home and garden maintenance
  - Health and wellness
  - General daily planning
- Responsive design for desktop and mobile devices
- Weather alerts and notifications
- Dark mode support
- Geolocation-based weather data
- City search functionality

## Technologies Used

- React 19
- Vite
- Chart.js / React-Chartjs-2
- Axios for API requests
- React Icons

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd weather-dashboard
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
# or
yarn build
```

Generated files will be in the `dist` directory.

## Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## Project Structure

- `/src`: Source code
  - `/components`: Reusable UI components
  - `/contexts`: React context providers
  - `/hooks`: Custom React hooks
  - `/data`: Static data and utilities
  - `/assets`: Images and static resources

## License

MIT
