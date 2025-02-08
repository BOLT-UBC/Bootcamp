import { FC, useEffect, useState } from "react";
import React from "react";

import "./Rocket.css";

interface RocketProps {
  targetDate: string;
}

const Rocket: FC<RocketProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  function getTimeLeft() {
    const now = new Date();
    const countdownTarget = new Date(targetDate);
    const difference = countdownTarget.getTime() - now.getTime();

    if (difference <= 0) {
      return "T-00:00:00";
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);

    return `T-${days.toString().padStart(2, "0")}:${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  }

  return (
    <div className="title-countdown">
      <img src="/Rocket.png" alt="Rocket" />
      <div className="countdown-label">
        <h1>Registration ends in</h1>
      </div>
      <div className="countdown">
        <h1>{timeLeft}</h1>
      </div>
      <div className="countdown-sublabel-time">
        <h1>time</h1>
      </div>
      <div className="countdown-sublabel-days">
        <h1>days</h1>
      </div>
      <div className="countdown-sublabel-hours">
        <h1>hours</h1>
      </div>
      <div className="countdown-sublabel-minutes">
        <h1>minutes</h1>
      </div>
    </div>
  );
};

export default Rocket;
