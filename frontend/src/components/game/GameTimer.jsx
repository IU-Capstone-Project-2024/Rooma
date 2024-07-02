import React, { useState, useEffect } from 'react';
import timerSvg from '../../assets/hideAndSeek/timer.svg';

const GameTimer = ({ endTime }) => {
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

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div style={{ position: 'relative', width: '200px', height: '200px' }}>
      <img src={timerSvg} alt="Timer Background" style={{ width: '100%', height: '100%' }} />
      <div style={{
        position: 'absolute',
        top: '50%',
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
