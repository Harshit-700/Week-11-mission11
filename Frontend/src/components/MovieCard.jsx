import { POSTER_COLORS, POSTER_EMOJIS } from "../constants";


function getPosterSrc(movie) {
  if (movie.poster_url) return movie.poster_url;
  return null;
}

export default function MovieCard({ movie, isFav, onToggleFav, onClick }) {
  const colorIdx = Math.abs(
    (movie.id || "").toString().split("").reduce((a, c) => a + c.charCodeAt(0), 0)
  ) % POSTER_COLORS.length;

  const posterSrc = getPosterSrc(movie);

  return (
    <div className="movie-card" onClick={() => onClick(movie)}>
      {posterSrc ? (
        <img
          className="card-poster"
          src={posterSrc}
          alt={movie.title}
          loading="lazy"
          onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
        />
      ) : null}
      <div
        className="card-poster-placeholder"
        style={{
          background: POSTER_COLORS[colorIdx],
          display: posterSrc ? "none" : "flex",
        }}
      >
        {POSTER_EMOJIS[colorIdx]}
      </div>

      <div className="card-overlay" />

      <button
        className={`card-fav${isFav ? " active" : ""}`}
        onClick={(e) => { e.stopPropagation(); onToggleFav(movie); }}
      >
        {isFav ? "❤️" : "🤍"}
      </button>

      <div className="card-info">
        <div className="card-title">{movie.title}</div>
        <div className="card-meta">
          <span className="card-year">{movie.release_date?.slice(0, 4)}</span>
          <span className="card-rating">
            {movie.vote_average ? `⭐ ${movie.vote_average.toFixed(1)}` : "—"}
          </span>
        </div>
      </div>
    </div>
  );
}
