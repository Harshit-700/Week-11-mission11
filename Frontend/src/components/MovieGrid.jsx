import { useRef } from "react";
import MovieCard from "./MovieCard";

export default function MovieGrid({ movies, favorites, onToggleFav, onMovieClick, loading, title, onSentinel }) {
  const sentinelRef = useRef(null);

 
  const setSentinel = (el) => {
    sentinelRef.current = el;
    if (el && onSentinel) onSentinel(el);
  };

  const isFav = (id) => favorites.some((m) => m.id === id);

  return (
    <div className="content">
      <div className="section-header">
        <div className="section-bar" />
        <div className="section-title">{title}</div>
        {movies.length > 0 && (
          <span className="section-count">{movies.length} movies</span>
        )}
      </div>

      {movies.length === 0 && !loading && (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <div className="empty-title">No results found</div>
          <div className="empty-sub">Try a different search term</div>
        </div>
      )}

      <div className="movies-grid">
        {movies.map((movie, i) => (
          <MovieCard
            key={`${movie.id}-${i}`}
            movie={movie}
            isFav={isFav(movie.id)}
            onToggleFav={onToggleFav}
            onClick={onMovieClick}
          />
        ))}
      </div>

      {loading && (
        <div className="loader-wrap">
          <div className="spinner" />
          <span>Loading more movies...</span>
        </div>
      )}

      <div className="sentinel" ref={setSentinel} />
    </div>
  );
}
