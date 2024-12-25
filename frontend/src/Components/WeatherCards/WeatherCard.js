import React from 'react';
import './WeatherCard.css';
import TempHum from '../TempHum/TempHum';
import Vent from '../Vent/Vent';
import WeatherDesc from '../WeatherDescription/WeatherDesc'
import DirVent from '../DirectionVent/DirVent';
import Stats from '../Statistics/Stats'

export const VerticalWeatherCard = ({ weather }) => (
    <div className="weather-card vertical">
        <TempHum />
        <Vent/>
        <DirVent/>

    </div>
);

export const HorizontalWeatherCard = ({ weather }) => (
    <div className="weather-card horizontal">
        <div className='weatherdesc'>
        <WeatherDesc/>
        <Stats/>
        </div>
    </div>
);
