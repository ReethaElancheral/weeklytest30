import React, { useRef, useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, push } from "firebase/database";
import Message from "./Message";

export default function ChatBox({ username, messages }) {
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    const msgRef = ref(db, "messages");
    push(msgRef, {
      user: username,
      text: input,
      timestamp: Date.now(),
    });
    setInput("");
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, i) => (
          <Message key={i} msg={msg} self={msg.user === username} />
        ))}
        <div ref={endRef} />
      </div>
      <div className="input-bar">
        <input
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
