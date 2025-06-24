import React, { useEffect, useState } from "react";

export default function Countdown({ targetDate, eventName }) {
  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const timerComponents = [];
  Object.entries(timeLeft).forEach(([unit, value]) => {
    timerComponents.push(
      <div key={unit} className="time-segment">
        <span className="value">{value.toString().padStart(2, '0')}</span>
        <span className="unit">{unit}</span>
      </div>
    );
  });

  return (
    <div className="countdown">
      <h2>{eventName}</h2>
      {timerComponents.length ? (
        <div className="timer-grid">{timerComponents}</div>
      ) : (
        <div className="expired">🎉 The event has started!</div>
      )}
    </div>
  );
}
