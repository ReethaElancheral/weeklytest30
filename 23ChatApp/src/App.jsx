

import './App.css'

import React, { useEffect, useRef, useState } from "react";
import { db } from "./firebase";
import { ref, push, onValue } from "firebase/database";
import ChatBox from "./components/ChatBox";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const msgRef = ref(db, "messages");
    onValue(msgRef, (snapshot) => {
      const data = snapshot.val();
      const parsed = data ? Object.values(data) : [];
      setMessages(parsed);
    });
  }, []);

  const handleJoin = () => {
    if (username.trim()) {
      setReady(true);
    }
  };

  return (
    <div className="app">
      <h1>🔥 Firebase Chat</h1>
      {!ready ? (
        <div className="login">
          <input
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleJoin}>Join Chat</button>
        </div>
      ) : (
        <ChatBox username={username} messages={messages} />
      )}
    </div>
  );
}

