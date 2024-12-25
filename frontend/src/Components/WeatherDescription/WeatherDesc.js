import React, { useEffect, useState } from 'react';
import './WeatherDesc.css';

// Importing the gifs based on the weather condition
import descpluie from './weathericons/descpluie.gif';
import descsunny from './weathericons/descsunny.gif';
import descvent from './weathericons/descvent.gif';
import desccloudy from './weathericons/desccloudy.gif';
import descnightclear from './weathericons/descnightclear.gif';
import desccloudynight from './weathericons/descnightcloudy.gif'; 
import defaultgif from './weathericons/defaultgif.gif'; 


const WeatherDesc = () => {
  const [description, setDescription] = useState('');
  const [weatherGif, setWeatherGif] = useState(null); // To store the gif based on the description
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchWeather = async () => {
      try {
        const apiKey = '218bf93db67444e9b85131849243011'; // Your WeatherAPI key
        const city = 'Mahdia'; // Your city
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=fr`
        );
        const data = await response.json();

        if (response.ok) {
          const weatherDescription = data.current.condition.text; // Extract weather description
          const currentTime = new Date(); // Use system clock
const currentHour = currentTime.getHours();
const isNight = currentHour >= 18 || currentHour < 6;

          console.log('Local Time from API:', data.location.localtime);
          console.log('Extracted Hour:', currentHour);
          console.log('Is Night:', isNight);
          
          setDescription(weatherDescription);

          // Set gif based on description and time
          if (weatherDescription.toLowerCase().includes('pluie')) {
            setWeatherGif(descpluie);
          } else if (weatherDescription.toLowerCase().includes('soleil')) {
            setWeatherGif(isNight ? descnightclear : descsunny);
          } else if (weatherDescription.toLowerCase().includes('vent')) {
            setWeatherGif(descvent);
          } else if (weatherDescription.toLowerCase().includes('nuage') || 
          weatherDescription.toLowerCase().includes('brouillard')) {
            setWeatherGif(isNight ? desccloudynight : desccloudy);
          } else {
            setWeatherGif(defaultgif); // If no match, no gif
          }
        } else {
          throw new Error(data.error.message || 'Failed to fetch weather data');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="weather-description">
      {error ? (
        <p className="error">Erreur: {error}</p>
      ) : (
        <div className="description-container">
          {/* The GIF will appear on the left */}
          {weatherGif && (
            <img
              src={weatherGif}
              alt="Weather GIF"
              className="weather-gif"
            />
          )}
          <p className="description">
            {description}
          </p>
        </div>
      )}
    </div>
  );
};

export default WeatherDesc;
