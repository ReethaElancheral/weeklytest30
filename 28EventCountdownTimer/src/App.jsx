

import './App.css'

import React, { useState } from "react";
import Countdown from "./components/Countdown";

export default function App() {
  const [eventName, setEventName] = useState("New Year 2026");
  const [eventDate, setEventDate] = useState("2026-01-01T00:00:00");

  return (
    <div className="container">
      <h1>🎉 Event Countdown</h1>
      <div className="settings">
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <input
          type="datetime-local"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
      </div>
      <Countdown targetDate={new Date(eventDate)} eventName={eventName} />
    </div>
  );
}
