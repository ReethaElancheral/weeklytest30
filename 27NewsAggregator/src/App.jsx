

import './App.css'
import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import ArticleList from "./components/ArticleList";

const API_KEY = "c2231c16f4f04a89905a75faf1439f45";
const BASE_URL = "https://newsapi.org/v2";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("latest");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchNews = (q) => {
    setLoading(true);
    setError("");
    fetch(
      `${BASE_URL}/everything?q=${encodeURIComponent(q)}&pageSize=20&apiKey=${API_KEY}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch news");
        return res.json();
      })
      .then((data) => {
        setArticles(data.articles);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  
  useEffect(() => {
    fetchNews(query);
  }, []);

  const handleSearch = (q) => {
    setQuery(q);
    fetchNews(q);
  };

  return (
    <div className="container">
      <h1>📰 News Aggregator</h1>
      <SearchBar onSearch={handleSearch} initial={query} />

      {loading && <p>Loading news...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && <ArticleList articles={articles} />}
    </div>
  );
}



