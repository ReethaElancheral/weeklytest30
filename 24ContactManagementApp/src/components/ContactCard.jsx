import React from "react";

export default function ContactCard({ contact, onEdit, onDelete }) {
  return (
    <div className="contact-card">
      <div>
        <h3>{contact.name}</h3>
        <p>📧 {contact.email}</p>
        <p>📞 {contact.phone}</p>
      </div>
      <div className="actions">
        <button onClick={onEdit}>✏️</button>
        <button onClick={onDelete}>🗑️</button>
      </div>
    </div>
  );
}
