import React, { useState } from "react";

export default function SearchBar({ onSearch, initial }) {
  const [term, setTerm] = useState(initial);

  const submit = (e) => {
    e.preventDefault();
    if (term.trim()) onSearch(term);
  };

  return (
    <form className="search-bar" onSubmit={submit}>
      <input
        type="text"
        placeholder="Search news..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}
