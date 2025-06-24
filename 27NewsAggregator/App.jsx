

import './App.css'
import React, { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import ArticleList from "./components/ArticleList";

const API_KEY = import.meta.env.VITE_NEWSAPI_API_KEY;  
const BASE_URL = "https://newsapi.org/v2";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("latest");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 const fetchNews = (q) => {
  setLoading(true);
  setError("");

  
  const url =
    `${BASE_URL}/top-headlines` +       
    `?country=us` +                    
    (q ? `&q=${encodeURIComponent(q)}` : "") +  
    `&pageSize=20` +                   
    `&apiKey=${API_KEY}`;              

  console.log("Fetching news from:", url);

  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`NewsAPI error ${res.status}`);
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
  }, [query]);

  const handleSearch = (q) => {
    setQuery(q.trim() || "latest");
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
