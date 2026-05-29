import { POSTER_COLORS } from "../constants";

export default function MovieModal({ movie, isFav, onToggleFav, onClose }) {
  if (!movie) return null;

  const colorIdx = Math.abs(
    (movie.id || "").toString().split("").reduce((a, c) => a + c.charCodeAt(0), 0)
  ) % POSTER_COLORS.length;

  const backdropStyle = movie.poster_url
    ? { backgroundImage: `url(${movie.poster_url})`, backgroundSize: "cover", backgroundPosition: "center top" }
    : { background: `linear-gradient(135deg, ${POSTER_COLORS[colorIdx]}, #0a0a0f)` };

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ position: "relative" }}>
          <div className="modal-backdrop" style={backdropStyle}>
            <div className="modal-backdrop-overlay" />
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="modal-title">{movie.title}</div>
          <div className="modal-meta">
            {movie.vote_average && (
              <span className="modal-rating">⭐ {movie.vote_average.toFixed(1)}</span>
            )}
            <span className="modal-year">{movie.release_date?.slice(0, 4)}</span>
            {movie.rated && movie.rated !== "N/A" && (
              <span className="modal-lang">{movie.rated}</span>
            )}
            {movie.runtime && movie.runtime !== "N/A" && (
              <span className="modal-lang">⏱ {movie.runtime}</span>
            )}
          </div>

          {movie.genre && (
            <p style={{ fontSize: 13, color: "#e50914", marginBottom: 10, fontWeight: 600 }}>
              {movie.genre}
            </p>
          )}

          <p className="modal-overview">{movie.overview || "No overview available."}</p>

          {movie.director && movie.director !== "N/A" && (
            <p style={{ fontSize: 13, color: "#8888a0", marginBottom: 6 }}>
              🎬 <strong style={{ color: "#f0f0f5" }}>Director:</strong> {movie.director}
            </p>
          )}
          {movie.actors && movie.actors !== "N/A" && (
            <p style={{ fontSize: 13, color: "#8888a0", marginBottom: 20 }}>
              🎭 <strong style={{ color: "#f0f0f5" }}>Cast:</strong> {movie.actors}
            </p>
          )}

          <div className="modal-actions">
            <button className="btn-watch">▶ Watch Now</button>
            <button className="btn-info" onClick={() => onToggleFav(movie)}>
              {isFav ? "❤️ Remove Favorite" : "🤍 Add to Favorites"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
