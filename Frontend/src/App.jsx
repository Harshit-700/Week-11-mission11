
import { useState, useEffect, useCallback, useRef } from "react";
import { MOCK_MOVIES } from "./constants";
import { searchMovies, getMovieDetail, PRESET_SEARCHES } from "./api";
import { useDebounce, useLocalStorage } from "./hooks";

import Sidebar       from "./components/Sidebar";
import TopBar        from "./components/TopBar";
import Hero          from "./components/Hero";
import MovieGrid     from "./components/MovieGrid";
import FavoritesPage from "./components/FavoritesPage";
import WatchlistPage from "./components/WatchlistPage";   
import MovieModal    from "./components/MovieModal";
import Toast         from "./components/Toast";

export default function App() {
  const [view,          setView]          = useState("home");
  const [movies,        setMovies]        = useState([]);
  const [page,          setPage]          = useState(1);
  const [hasMore,       setHasMore]       = useState(true);
  const [loading,       setLoading]       = useState(false);
  const [query,         setQuery]         = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching,     setSearching]     = useState(false);
  const [favorites,     setFavorites]     = useLocalStorage("cinestream_favs", []);
  const [toasts,        setToasts]        = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 500);
  const sentinelElRef  = useRef(null);
  const observerRef    = useRef(null);
  const loadingRef     = useRef(false);

  const fetchMovies = useCallback(async (pg, reset = false) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const keyword = PRESET_SEARCHES[view] || "action";
      const { movies: newMovies, totalPages } = await searchMovies(keyword, pg);
      setMovies((prev) => (reset ? newMovies : [...prev, ...newMovies]));
      setHasMore(pg < totalPages);
    } catch {
      setMovies(MOCK_MOVIES);
      setHasMore(false);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [view]);

  useEffect(() => {
    if (view === "favorites" || view === "watchlist") return;
    setMovies([]); setPage(1); setHasMore(true);
    setQuery(""); setSearchResults([]);
    fetchMovies(1, true);
  }, [view]);

  useEffect(() => {
    if (!debouncedQuery.trim()) { setSearchResults([]); return; }
    setSearching(true);
    searchMovies(debouncedQuery, 1)
      .then(({ movies }) => setSearchResults(movies))
      .catch(() => setSearchResults([]))
      .finally(() => setSearching(false));
  }, [debouncedQuery]);

  const handleSentinel = useCallback((el) => { sentinelElRef.current = el; }, []);

  useEffect(() => {
    if (debouncedQuery || view === "favorites" || view === "watchlist") return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loadingRef.current) {
        const next = page + 1;
        setPage(next);
        fetchMovies(next);
      }
    }, { threshold: 0.1 });
    if (sentinelElRef.current) observerRef.current.observe(sentinelElRef.current);
    return () => observerRef.current?.disconnect();
  }, [hasMore, page, debouncedQuery, view, fetchMovies]);

  const handleMovieClick = useCallback(async (movie) => {
    setSelectedMovie(movie);
    if (!movie.overview) {
      setDetailLoading(true);
      try { const d = await getMovieDetail(movie.id); setSelectedMovie(d); } catch {}
      finally { setDetailLoading(false); }
    }
  }, []);

  const addToast = useCallback((msg, type) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  }, []);

  const toggleFav = useCallback((movie) => {
    setFavorites((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      addToast(exists ? `Removed: ${movie.title}` : `Added: ${movie.title}`, exists ? "remove" : "heart");
      return exists ? prev.filter((m) => m.id !== movie.id) : [movie, ...prev];
    });
  }, [setFavorites, addToast]);

  const isFav = (id) => favorites.some((m) => m.id === id);

  const displayMovies = debouncedQuery ? searchResults : movies;
  const gridTitle     = debouncedQuery
    ? `Results for "${debouncedQuery}"`
    : view === "toprated" ? "Top Rated Movies"
    : view === "upcoming" ? "Upcoming Movies"
    : "Popular Movies";

  return (
    <div className="app">
      <Sidebar activeView={view} onNavigate={setView} />

      <main className="main">
        <TopBar
          query={query}
          onQueryChange={setQuery}
          favCount={favorites.length}
          onFavClick={() => setView("favorites")}
        />

        {/* ── View  */}
        {view === "favorites" ? (
          <FavoritesPage
            favorites={favorites}
            onToggleFav={toggleFav}
            onMovieClick={handleMovieClick}
            onClearAll={() => { setFavorites([]); addToast("All favorites cleared", "remove"); }}
          />
        ) : view === "watchlist" ? (
          // ── NEW: MongoDB-powered Watchlist (Sprint 11 integration) ─────
          <WatchlistPage />
        ) : (
          <>
            {!debouncedQuery && movies.length > 0 && (
              <Hero movies={movies.slice(0, 5)} onMovieClick={handleMovieClick} />
            )}
            <MovieGrid
              movies={displayMovies}
              favorites={favorites}
              onToggleFav={toggleFav}
              onMovieClick={handleMovieClick}
              loading={loading || searching}
              title={gridTitle}
              onSentinel={handleSentinel}
            />
          </>
        )}
      </main>

      <MovieModal
        movie={selectedMovie}
        isFav={selectedMovie ? isFav(selectedMovie.id) : false}
        onToggleFav={toggleFav}
        onClose={() => setSelectedMovie(null)}
        detailLoading={detailLoading}
      />

      <Toast toasts={toasts} />
    </div>
  );
}
