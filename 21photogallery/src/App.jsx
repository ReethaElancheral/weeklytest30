

import './App.css'

import React, { useState, useEffect } from "react";
import img1 from "../src/assets/images/img1.jpeg";
import img2 from "../src/assets/images/img2.jpeg";
import img3 from "../src/assets/images/img3.jpeg";
import img4 from "../src/assets/images/img4.jpeg";
import img5 from "../src/assets/images/img5.jpeg";
import img6 from "../src/assets/images/img6.jpeg";
import img7 from "../src/assets/images/img7.jpeg";
import img8  from "../src/assets/images/img8.jpeg";
import img9 from "../src/assets/images/img9.jpeg";
import img10 from "../src/assets/images/img10.jpg";
import img11 from "../src/assets/images/img11.jpeg";
import img12 from "../src/assets/images/img12.jpeg";



const images = [img1, img2, img3,img4, img5,img6,img7,img8,img9,img10,img11,img12]

export default function App() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    function onKeyDown(e) {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowRight") {
        setLightboxIndex((i) => (i + 1) % images.length);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((i) => (i - 1 + images.length) % images.length);
      } else if (e.key === "Escape") {
        setLightboxIndex(null);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex]);

  return (
    <div className="app">
      <h1>Photo Gallery</h1>
     <div className="gallery">
  {images.map((src, idx) => (
    <div key={idx} className="gallery-item">
      <img
        src={src}
        alt={`Thumbnail ${idx + 1}`}
        className="thumb"
        onClick={() => setLightboxIndex(idx)}
      />
    </div>
  ))}
</div>

      {lightboxIndex !== null && (
        <div className="lightbox-overlay" onClick={() => setLightboxIndex(null)}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close" onClick={() => setLightboxIndex(null)}>
              ×
            </button>
            <button
              className="nav left"
              onClick={() =>
                setLightboxIndex(
                  (lightboxIndex - 1 + images.length) % images.length
                )
              }
            >
              ❮
            </button>
            <img
              src={images[lightboxIndex]}
              alt={`Image ${lightboxIndex + 1}`}
              className="lightbox-img"
            />
            <button
              className="nav right"
              onClick={() =>
                setLightboxIndex((lightboxIndex + 1) % images.length)
              }
            >
              ❯
            </button>
            <div className="image-counter">
              {lightboxIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
