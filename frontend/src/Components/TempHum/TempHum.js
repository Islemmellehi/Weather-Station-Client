import React, { useEffect, useState } from 'react';
import '../TempHum/TempHum.css';
import tempGif from '../icons/icons/temp.gif';
import humGif from '../icons/icons/hum.gif';

const TempHum = () => {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeatherData = () => {
    fetch('https://agile-education.up.railway.app/WeatherApi/GetWeatherData')
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data && data.data.temperatureHumidityData) {
          const tempHumData = data.data.temperatureHumidityData;
          setTemperature(tempHumData.temperatureCelsius);
          setHumidity(tempHumData.humidityPercentage);
        } else {
          throw new Error('Invalid data format');
        }
      })
      .catch((err) => {
        console.error('Error fetching weather data:', err);
        setError('Failed to load weather data');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchWeatherData(); // Fetch data initially

    const interval = setInterval(() => {
      fetchWeatherData();
      console.log("refreshed")
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
    <div className="weatherData" style={{ padding: '10px', width: '200px' }}>
      <h3>Paramètres météorologiques</h3>
      <div className="TempShow">
        <img id="ic" src={tempGif} alt="Animated temperature icon" style={{ width: '50px', height: '50px' }} />
        <p id="temp">
          <strong>Température:</strong> {temperature}°C
        </p>
      </div>
      <div className="HumShow">
        <img id="it" src={humGif} alt="Animated humidity icon" style={{ width: '45px', height: '45px' }} />
        <p id="hum">
          <strong>Humidité:</strong> {humidity}%
        </p>
      </div>
    </div>
  );
};

export default TempHum;
