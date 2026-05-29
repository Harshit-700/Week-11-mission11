
import { API_KEY, BASE_URL, BACKEND_URL } from "./constants";
function normalizeMovie(m) {
  return {
    id: m.imdbID,
    title: m.Title,
    release_date: m.Year ? `${m.Year}-01-01` : null,
    vote_average: m.imdbRating && m.imdbRating !== "N/A" ? parseFloat(m.imdbRating) : null,
    poster_path: null,
    poster_url: m.Poster && m.Poster !== "N/A" ? m.Poster : null,
    backdrop_path: null,
    overview: m.Plot && m.Plot !== "N/A" ? m.Plot : "",
    original_language: m.Language || null,
    genre: m.Genre || null,
    director: m.Director || null,
    actors: m.Actors || null,
    runtime: m.Runtime || null,
    rated: m.Rated || null,
  };
}
export async function searchMovies(query, page = 1) {
  const url = `${BASE_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie&page=${page}`;
  const res  = await fetch(url);
  const data = await res.json();
  if (data.Response === "False") throw new Error(data.Error || "Not found");
  const movies      = (data.Search || []).map(normalizeMovie);
  const totalPages  = Math.ceil(parseInt(data.totalResults || "0", 10) / 10);
  return { movies, totalPages };
}

export async function getMovieDetail(imdbID) {
  const url  = `${BASE_URL}/?apikey=${API_KEY}&i=${imdbID}&plot=full`;
  const res  = await fetch(url);
  const data = await res.json();
  if (data.Response === "False") throw new Error(data.Error);
  return normalizeMovie(data);
}

export const PRESET_SEARCHES = {
  home:     "avengers",
  popular:  "marvel",
  toprated: "batman",
  upcoming: "spider",
};
async function backendRequest(path, options = {}) {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(
      (data.errors || [data.message]).filter(Boolean).join(", ") || `HTTP ${res.status}`
    );
  }
  return data;
}
export const fetchWatchlistPosts = () => backendRequest("/posts");
export const createWatchlistPost = (body) =>
  backendRequest("/posts", { method: "POST", body: JSON.stringify(body) });
export const deleteWatchlistPost = (id) =>
  backendRequest(`/posts/${id}`, { method: "DELETE" });
