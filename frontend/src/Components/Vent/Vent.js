import React, { useEffect, useState } from 'react';
import './Vent.css';
import vent from '../icons/icons/vent.gif';

const Vent = () => {
  const [windSpeed, setWindSpeed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWindData = () => {
    fetch('https://agile-education.up.railway.app/WeatherApi/GetWeatherData')
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data && data.data.windspeed) {
          const windData = data.data.windspeed;
          setWindSpeed(windData.vitesseVentkmh);
        } else {
          throw new Error('Invalid data format');
        }
      })
      .catch((err) => {
        console.error('Error fetching wind data:', err);
        setError('Failed to load wind data');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchWindData(); // Fetch data initially

    const interval = setInterval(() => {
      fetchWindData(); // Refresh data every 10 seconds
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
    <div className="windData" style={{ padding: '10px', width: '200px' }}>
      <div className="WindShow">
        <img id="windIcon" src={vent} alt="Animated wind icon" style={{ width: '50px', height: '50px' }} />
        <p id="windSpeed">
          <strong>Vitesse du vent:</strong> {windSpeed} km/h
        </p>
      </div>
    </div>
  );
};

export default Vent;
