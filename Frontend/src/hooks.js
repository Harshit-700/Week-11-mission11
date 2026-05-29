
import { useState, useEffect, useCallback } from "react";
import { fetchWatchlistPosts, createWatchlistPost, deleteWatchlistPost } from "./api";
export function useDebounce(val, delay = 500) {
  const [debounced, setDebounced] = useState(val);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(val), delay);
    return () => clearTimeout(t);
  }, [val, delay]);
  return debounced;
}
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
export function useWatchlist() {
  const [posts,      setPosts]      = useState([]);
  const [loading,    setLoading]    = useState(true);  
  const [error,      setError]      = useState(null);   
  const [submitting, setSubmitting] = useState(false);  
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

  const addPost = async ({ title, content }) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await createWatchlistPost({ title, content });
      setPosts((prev) => [res.data, ...prev]); 
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const removePost = async (id) => {
    const snapshot = posts;
    setPosts((prev) => prev.filter((p) => p._id !== id)); 
    try {
      await deleteWatchlistPost(id);
    } catch (err) {
      setPosts(snapshot);
      setError(err.message);
    }
  };

  return { posts, loading, error, submitting, addPost, removePost, reload: load };
}
