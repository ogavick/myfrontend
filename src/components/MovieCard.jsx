import { useState } from "react";
import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } =
    useMovieContext();

  const favorite = isFavorite(movie.id);
  const [trailerKey, setTrailerKey] = useState("");
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  function onFavoriteClick(e) {
    e.stopPropagation(); // IMPORTANT: so trailer doesn't open when you click heart
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  }

  async function onCardClick() {
    if (trailerKey) {
      setTrailerKey(""); // close if already open
      return;
    }

    setLoadingTrailer(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      );
      const data = await res.json();
      const trailer = data.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );
      if (trailer) {
        setTrailerKey(trailer.key);
      } else {
        alert("No trailer found for this movie");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to load trailer");
    }
    setLoadingTrailer(false);
  }

  return (
    <>
      <div className="movie-card" onClick={onCardClick} style={{ cursor: "pointer" }}>
        <div className="movie-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />

          <div className="movie-overlay">
            <button
              className={`favorite-btn ${favorite? "active" : ""}`}
              onClick={onFavoriteClick}
            >
              ❤️
            </button>
          </div>
        </div>

        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p>{movie.release_date?.split("-")[0]}</p>
          {loadingTrailer && <p>Loading trailer...</p>}
        </div>
      </div>

      {trailerKey && (
        <div
          className="trailer-modal"
          onClick={() => setTrailerKey("")}
          style={{
            position: "fixed",
            top: 0, left: 0,
            width: "100%", height: "100%",
            background: "rgba(0,0,0,0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999
          }}
        >
          <iframe
            width="80%"
            height="60%"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            frameBorder="0"
            allowFullScreen
            title={movie.title}
          ></iframe>
        </div>
      )}
    </>
  );
}

export default MovieCard;