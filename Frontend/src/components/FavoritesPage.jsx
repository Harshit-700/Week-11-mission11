import MovieCard from "./MovieCard";

export default function FavoritesPage({ favorites, onToggleFav, onMovieClick, onClearAll }) {
  return (
    <div className="fav-page">
      <div className="fav-header">
        <div>
          <div className="fav-title">❤️ My Favorites</div>
          <div className="fav-sub">Your saved movies collection</div>
        </div>
        {favorites.length > 0 && (
          <button className="clear-btn" onClick={onClearAll}>
            🗑️ Clear All
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">💔</div>
          <div className="empty-title">No favorites yet</div>
          <div className="empty-sub">Heart a movie to save it here</div>
        </div>
      ) : (
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFav={true}
              onToggleFav={onToggleFav}
              onClick={onMovieClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}
