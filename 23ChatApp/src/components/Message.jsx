import React from "react";

export default function Message({ msg, self }) {
  return (
    <div className={`message ${self ? "self" : ""}`}>
      <div className="meta">{self ? "You" : msg.user || "Unknown"}</div>
      <div className="text">{msg.text}</div>
    </div>
  );
}
