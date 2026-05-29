import { useState, useEffect } from "react";
import { POSTER_COLORS } from "../constants";

export default function Hero({ movies, onMovieClick }) {
  const [idx, setIdx] = useState(0);
  const count = Math.min(movies.length, 5);

  useEffect(() => {
    if (count === 0) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % count), 5000);
    return () => clearInterval(t);
  }, [count]);

  if (!movies.length) return null;
  const movie = movies[idx];
  const colorIdx = Math.abs(
    (movie.id || "").toString().split("").reduce((a, c) => a + c.charCodeAt(0), 0)
  ) % POSTER_COLORS.length;

  const backdropStyle = movie.poster_url
    ? { backgroundImage: `url(${movie.poster_url})`, backgroundSize: "cover", backgroundPosition: "center top", filter: "blur(2px) brightness(0.6)" }
    : { background: `linear-gradient(135deg, ${POSTER_COLORS[colorIdx]}, #0a0a0f)` };

  return (
    <div className="hero">
      <div className="hero-backdrop" style={backdropStyle} />
      <div className="hero-overlay" />

      <div className="hero-content">
        <div className="hero-label">Featured Movie</div>
        <div className="hero-title">{movie.title}</div>
        <p className="hero-desc">{movie.overview || "Click for more details."}</p>
        <div className="hero-actions">
          <button className="btn-watch" onClick={() => onMovieClick(movie)}>
            ▶ Watch Now
          </button>
          <button className="btn-info" onClick={() => onMovieClick(movie)}>
            ℹ️ More Info
          </button>
        </div>
      </div>

      <button className="hero-nav prev" onClick={() => setIdx((i) => (i - 1 + count) % count)}>‹</button>
      <button className="hero-nav next" onClick={() => setIdx((i) => (i + 1) % count)}>›</button>

      <div className="hero-dots">
        {Array.from({ length: count }).map((_, i) => (
          <button key={i} className={`dot${i === idx ? " active" : ""}`} onClick={() => setIdx(i)} />
        ))}
      </div>
    </div>
  );
}
