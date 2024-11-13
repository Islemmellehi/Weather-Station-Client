import React, { useEffect, useState } from 'react';
import './Background.css';
import sunnyMorning from '../Background/BackgroundAssets/clear/morning-sunny2.mp4'; 
import sunnyAfternoon from '../Background/BackgroundAssets/clear/afternoon-sunny.mp4'; 
import sunnyNight from '../Background/BackgroundAssets/clear/night-sunny.mp4'; 

const Background = () => {
    const [videoSrc, setVideoSrc] = useState(sunnyMorning);

    useEffect(() => {
        const updateVideo = () => {
            const currentHour = new Date().getHours(); 
            console.log("Current hour:", currentHour); 
            if (currentHour >= 6 && currentHour < 15) {
                console.log("Setting to morning video");
                setVideoSrc(sunnyMorning);
            } else if (currentHour >= 15 && currentHour < 19) {
                console.log("Setting to afternoon video");
                setVideoSrc(sunnyAfternoon);
            } else {
                console.log("Setting to night video");
                setVideoSrc(sunnyNight);
            }
        };

        updateVideo();
        const timerId = setInterval(updateVideo, 60000); 

        return () => clearInterval(timerId);
    }, []);

    return (
        <div className="background">
            <video key={videoSrc} className="background-video" autoPlay loop muted>
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default Background;
