const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const getResults = async (url) => {
  if (!API_KEY) {
    throw new Error("Missing VITE_TMDB_API_KEY in the .env file");
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Movie API request failed with status ${response.status}`);
  }

  const data = await response.json();
  if (!Array.isArray(data.results)) {
    throw new Error("Movie API response did not include results");
  }

  return data.results;
};

export const getPopularMovies = async () => {
  return getResults(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
};

export const searchMovies = async (query) => {
  return getResults(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
  );
};
