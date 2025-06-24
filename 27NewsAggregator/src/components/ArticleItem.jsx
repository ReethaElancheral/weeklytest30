import React from "react";

export default function ArticleItem({ article }) {
  const {
    title,
    source: { name },
    publishedAt,
    url,
    urlToImage,
    description,
  } = article;

  return (
    <li className="article-item">
      {urlToImage && (
        <img src={urlToImage} alt={title} className="thumb" />
      )}
      <div className="content">
        <h3>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h3>
        <p className="meta">
          {name} • {new Date(publishedAt).toLocaleDateString()}
        </p>
        <p className="desc">{description}</p>
      </div>
    </li>
  );
}
