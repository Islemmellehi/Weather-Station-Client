import React, { useEffect, useState } from 'react';
import './Background.css';

import sunnyMorning from './BackgroundAssets/clear/morning-sunny2.mp4';
import sunnyAfternoon from './BackgroundAssets/clear/afternoon-sunny.mp4';
import sunnyNight from './BackgroundAssets/clear/night-sunny.mp4';
import rainyMorning from './BackgroundAssets/rainy/rainyday.mp4';
import rainyNight from './BackgroundAssets/rainy/rainynight.mp4';
import cloudyMorning from './BackgroundAssets/cloudy/cloudyweather.mp4';
import cloudyNight from './BackgroundAssets/cloudy/nightcloud.mp4';

// Add more weather-specific video paths as needed


const Background = () => {
    const [videoSrc, setVideoSrc] = useState(sunnyMorning);
    const [weatherDesc, setWeatherDesc] = useState(''); // Store weather description
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
                    setWeatherDesc(data.current.condition.text.toLowerCase());
                } else {
                    throw new Error(data.error.message || 'Failed to fetch weather data');
                }
            } catch (err) {
                setError(err.message);
            }
        };

        fetchWeather();
    }, []); // Fetch weather data on mount

    useEffect(() => {
        const updateVideo = () => {
            const currentHour = new Date().getHours();
            console.log("Current hour:", currentHour);
            console.log("Weather description:", weatherDesc);

            // Determine time of day
            const timeOfDay = 
                currentHour >= 6 && currentHour < 15 ? 'morning' :
                currentHour >= 15 && currentHour < 19 ? 'afternoon' :
                'night';

            // Determine weather condition
            let weatherCondition = 'clear'; // Default
            if (weatherDesc.includes('pluie')) weatherCondition = 'rainy';
            else if (weatherDesc.includes('nuage') || weatherDesc.includes('brouillard')) weatherCondition = 'cloudy';

            console.log("Time of day:", timeOfDay);
            console.log("Weather condition:", weatherCondition);

            // Map weather and time to videos
            const videoMap = {
                morning: {
                    clear: sunnyMorning, // './BackgroundAssets/clear/morning-sunny2.mp4'
                    rainy: rainyMorning, // './BackgroundAssets/rainy/rainyday.mp4'
                    cloudy: cloudyMorning, // './BackgroundAssets/cloudy/cloudyday.mp4'
                },
                afternoon: {
                    clear: sunnyAfternoon, // './BackgroundAssets/clear/afternoon-sunny.mp4'
                    rainy: rainyMorning, // Use the same as `rainyMorning` or add new asset
                    cloudy: cloudyMorning, // './BackgroundAssets/cloudy/cloudyday.mp4'
                },
                night: {
                    clear: sunnyNight, // './BackgroundAssets/clear/night-sunny.mp4'
                    rainy: rainyNight, // './BackgroundAssets/rainy/rainynight.mp4'
                    cloudy: cloudyNight, // './BackgroundAssets/cloudy/nightcloud.mp4'
                },
            };
            

            const selectedVideo = videoMap[timeOfDay]?.[weatherCondition] || sunnyMorning; // Default fallback
            setVideoSrc(selectedVideo);
        };

        updateVideo();
        const timerId = setInterval(updateVideo, 60000); // Update every minute

        return () => clearInterval(timerId);
    }, [weatherDesc]); // Recalculate when weather description changes

    return (
        <div className="background">
            {error ? (
                <p className="error">Erreur: {error}</p>
            ) : (
                <video key={videoSrc} className="background-video" autoPlay loop muted>
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
        </div>
    );
};

export default Background;
