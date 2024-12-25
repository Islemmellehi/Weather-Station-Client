import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css';
import Background from '../Background/Background';
import { VerticalWeatherCard, HorizontalWeatherCard } from '../WeatherCards/WeatherCard';
import TimeDate from '../Time/TimeDate'
import Button from '../UserLogin/LoginForm/Buttons/Button';
import TempHum from '../TempHum/TempHum';


const HomePage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
    navigate('/login'); 
  };
  
  
  return (
    <div className="home-container">
      <Background/>
      <div className='weather-card-horizental'>
      <HorizontalWeatherCard/>

      </div>
      <div className='weather-card-vertical'>
      <VerticalWeatherCard/>
      </div>
      <div className='time'>
        <TimeDate/>
      </div>
      <div className='logout'>
        <Button
        color={"black"}
        buttonText={"Logout"}
        onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default HomePage;
