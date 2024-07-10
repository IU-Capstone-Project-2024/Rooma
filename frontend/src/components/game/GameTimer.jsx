import React, { useState, useEffect } from 'react';
import timerStandardSvg from '../../assets/hideAndSeek/timer_standard.svg';
import timerSnowSvg from '../../assets/hideAndSeek/timer_snow.svg';
import timerBrokenSvg from '../../assets/hideAndSeek/timer_broken.svg';

const GameTimer = ({ endTime, onComplete, frozen = false, broken = false }) => {
  const calculateTimeLeft = () => {
    const difference = endTime - new Date().getTime();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
  const timerSvg = frozen ? timerSnowSvg : broken ? timerBrokenSvg : timerStandardSvg;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());

      if (endTime - new Date().getTime() <= 0) {
        clearInterval(timer);
        onComplete();
      }

    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
      <div style={{position: 'relative', width: '200px', height: '200px'}}>
        <img src={timerSvg} alt="Timer Background" style={{width: '100%', height: '100%'}}/>

        <div style={{
          position: 'absolute',
          top: frozen ? '45%' : '50%',
          left: '50%',
          transform: 'translate(-50%, -20%)',
          fontSize: '24px',
        }}>
          {`${formatTime(timeLeft.hours || 0)}:${formatTime(timeLeft.minutes || 0)}:${formatTime(timeLeft.seconds || 0)}`}
        </div>
      </div>
  );
};

export default GameTimer;
