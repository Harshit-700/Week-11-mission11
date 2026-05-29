export default function TopBar({ query, onQueryChange, favCount, onFavClick }) {
  return (
    <div className="topbar">
      <div className="search-wrap">
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </div>
      <button className="filter-btn">⚙️ Filter</button>
      <button className="fav-btn-top" onClick={onFavClick}>
        ❤️ My Favorites {favCount > 0 && `(${favCount})`}
      </button>
    </div>
  );
}
