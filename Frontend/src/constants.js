
export const API_KEY  = "e2a53bdc";
export const BASE_URL = "https://www.omdbapi.com";

export const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const POSTER_COLORS = [
  "#1a0a2e","#0a1a2e","#2e0a0a","#0a2e1a",
  "#1a2e0a","#2e1a0a","#0a2e2e","#2e0a2e",
];

export const POSTER_EMOJIS = [
  "🦇","🕷️","💫","🚀","🦁","🎭","🔫","⚔️","🌊","🤖","🏛️","💎",
];

export const MOCK_MOVIES = [
  { id: 1,  title: "The Batman",               release_date: "2022-03-04", vote_average: 7.8, poster_path: null, backdrop_path: null, overview: "When a sadistic killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption." },
  { id: 2,  title: "Spider-Man: No Way Home",  release_date: "2021-12-17", vote_average: 8.2, poster_path: null, backdrop_path: null, overview: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help." },
  { id: 3,  title: "Inception",                release_date: "2010-07-16", vote_average: 8.8, poster_path: null, backdrop_path: null, overview: "A thief who steals corporate secrets through dream-sharing technology." },
  { id: 4,  title: "Interstellar",             release_date: "2014-11-07", vote_average: 8.6, poster_path: null, backdrop_path: null, overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival." },
  { id: 5,  title: "The Dark Knight",          release_date: "2008-07-18", vote_average: 9.0, poster_path: null, backdrop_path: null, overview: "When the menace known as the Joker wreaks havoc on Gotham City, Batman must accept one of the greatest tests." },
  { id: 6,  title: "Oppenheimer",              release_date: "2023-07-21", vote_average: 8.6, poster_path: null, backdrop_path: null, overview: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb." },
];

export const NAV_ITEMS = [
  { id: "home",      icon: "🏠", label: "Home"        },
  { id: "popular",   icon: "🔥", label: "Popular"     },
  { id: "toprated",  icon: "⭐", label: "Top Rated"   },
  { id: "upcoming",  icon: "📅", label: "Upcoming"    },
  { id: "favorites", icon: "❤️", label: "My Favorites" },
  { id: "watchlist", icon: "📋", label: "My Watchlist" },
];

export const ENDPOINTS = {
  home:     "/movie/popular",
  popular:  "/movie/popular",
  toprated: "/movie/top_rated",
  upcoming: "/movie/upcoming",
};
