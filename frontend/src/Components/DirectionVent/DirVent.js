import React, { useEffect, useState } from 'react';
import './DirVent.css';
import vent from '../icons/icons/winddir.gif';

const DirVent = () => {
  const [windDirection, setWindDirection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWindData = () => {
    fetch('https://agile-education.up.railway.app/WeatherApi/GetWeatherData')
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data && data.data.windData) {
          let direction = data.data.windData.windDirectionCompass; // Extract the compass direction
          // Translate direction to French
          switch (direction) {
            case 'N':
              direction = 'Nord';
              break;
            case 'S':
              direction = 'Sud';
              break;
            case 'W':
              direction = 'Ouest';
              break;
            case 'E':
              direction = 'Est';
              break;
            default:
              direction = direction; // Keep original value for other directions (e.g., NE, NW)
          }
          setWindDirection(direction); // Update state with translated direction
        } else {
          throw new Error('Invalid data format');
        }
      })
      .catch((err) => {
        console.error('Error fetching wind data:', err);
        setError('Failed to load wind direction');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    // Fetch data immediately
    fetchWindData();

    // Set up the interval to fetch data every 10 seconds
    const interval = setInterval(() => {
      fetchWindData();
    }, 5000);

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div
      className="windDataDir"
      style={{
        padding: '10px',
        width: '200px',
      }}
    >
      <div className="WindDir">
        <img
          id="windIcon"
          src={vent}
          alt="Animated wind icon"
          style={{ width: '60px', height: '60px', marginLeft: '-47%' }}
        />
        <p id="windDir">
          <strong>Direction du vent:</strong> {windDirection}
        </p>
      </div>
    </div>
  );
};

export default DirVent;
