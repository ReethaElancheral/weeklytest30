import React from "react";
import ArticleItem from "./ArticleItem";

export default function ArticleList({ articles }) {
  if (articles.length === 0) return <p>No articles found.</p>;

  return (
    <ul className="article-list">
      {articles.map((a, i) => (
        <ArticleItem key={i} article={a} />
      ))}
    </ul>
  );
}
