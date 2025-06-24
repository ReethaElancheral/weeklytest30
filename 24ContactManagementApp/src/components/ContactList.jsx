import React from "react";
import ContactCard from "./ContactCard";

export default function ContactList({ contacts, search, onEdit, onDelete }) {
  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  if (filtered.length === 0) return <p>No contacts found.</p>;

  return (
    <div className="contact-list">
      {filtered.map((c) => (
        <ContactCard
          key={c.id}
          contact={c}
          onEdit={() => onEdit(c)}
          onDelete={() => onDelete(c.id)}
        />
      ))}
    </div>
  );
}
