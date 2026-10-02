import "../css/favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorite } = useMovieContext();
  if (favorite) {
    return (
      <div className="favorites">
        <h2>My Favorite Movies</h2>
        <div className="movies-grid">
          {favorite.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="Favorites-empty">
      <h2>No Favorite Movies Yet! </h2>
      <p>Start adding some favorite movies to see them here.</p>
    </div>
  );
}

export default Favorites;
