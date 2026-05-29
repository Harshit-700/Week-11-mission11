// hooks.js
import { useState, useEffect, useCallback } from "react";
import { fetchWatchlistPosts, createWatchlistPost, deleteWatchlistPost } from "./api";

// ── Debounce ───────────────────────────────────────────────────────────────
export function useDebounce(val, delay = 500) {
  const [debounced, setDebounced] = useState(val);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(val), delay);
    return () => clearTimeout(t);
  }, [val, delay]);
  return debounced;
}

// ── LocalStorage ───────────────────────────────────────────────────────────
export function useLocalStorage(key, initial) {
  const [stored, setStored] = useState(() => {
    try { const item = localStorage.getItem(key); return item ? JSON.parse(item) : initial; }
    catch { return initial; }
  });
  const setValue = useCallback((val) => {
    setStored(val);
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  }, [key]);
  return [stored, setValue];
}

// ── Watchlist (MongoDB via Express) ───────────────────────────────────────
// Phase 1 (P0): useEffect triggers GET on mount, populates state
// Phase 2 (P1): addPost → POST, removePost → DELETE + optimistic DOM mutation
export function useWatchlist() {
  const [posts,      setPosts]      = useState([]);
  const [loading,    setLoading]    = useState(true);   // "Loading…" state
  const [error,      setError]      = useState(null);   // error boundary state
  const [submitting, setSubmitting] = useState(false);  // form submit state

  // ── Phase 1: GET on mount via useEffect ─────────────────────────────────
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchWatchlistPosts();
      setPosts(res.data);
    } catch (err) {
      setError(err.message || "Failed to connect to backend");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // ── Phase 2: POST → inject into MongoDB + prepend to local state ────────
  const addPost = async ({ title, content }) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await createWatchlistPost({ title, content });
      setPosts((prev) => [res.data, ...prev]); // optimistic prepend
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  // ── Phase 2: DELETE → remove from MongoDB + mutate local DOM state ──────
  const removePost = async (id) => {
    const snapshot = posts;
    setPosts((prev) => prev.filter((p) => p._id !== id)); // optimistic removal
    try {
      await deleteWatchlistPost(id);
    } catch (err) {
      setPosts(snapshot); // rollback on error
      setError(err.message);
    }
  };

  return { posts, loading, error, submitting, addPost, removePost, reload: load };
}
