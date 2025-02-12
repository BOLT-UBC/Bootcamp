import { FC, useEffect, useState } from "react";
import React from "react";

import "./Countdown.css";

interface CountdownProps {
  targetDate: string;
}

const Countdown: FC<CountdownProps> = ({ targetDate }) => {
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
    <div className="title-countdown2">
      <div className="countdown2">
        <h1>{timeLeft}</h1>
      </div>
      <div className="sublabel-wrapper">
        <div className="countdown-sublabel-time2">
            <h1>time</h1>
        </div>
        <div className="countdown-sublabel-days2">
            <h1>days</h1>
        </div>
        <div className="countdown-sublabel-hours2">
            <h1>hours</h1>
        </div>
        <div className="countdown-sublabel-minutes2">
            <h1>minutes</h1>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
