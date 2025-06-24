

import './App.css'


import React, { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

export default function App() {
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem("contacts");
    return saved ? JSON.parse(saved) : [];
  });

  const [editingContact, setEditingContact] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleAdd = (contact) => {
    if (editingContact) {
      setContacts((prev) =>
        prev.map((c) => (c.id === contact.id ? contact : c))
      );
      setEditingContact(null);
    } else {
      setContacts([{ ...contact, id: Date.now() }, ...contacts]);
    }
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      setContacts(contacts.filter((c) => c.id !== id));
    }
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
  };

  return (
    <div className="container">
      <h1>📇 Contact Manager</h1>
      <ContactForm onSave={handleAdd} editing={editingContact} />
      <input
        className="search"
        placeholder="Search contacts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ContactList
        contacts={contacts}
        search={search}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
