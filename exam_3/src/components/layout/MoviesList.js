import axios from "axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const baseURL = 'https://api.themoviedb.org/3/discover/movie';
const imageBaseURL = 'https://image.tmdb.org/t/p/w300';
const imageOriginalURL = 'https://image.tmdb.org/t/p/original';
const apiKey = 'ddfb10c51e93bea162e98742b4f4c826';

function MoviesList () {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);

  async function fetchData() {
    axios.get(baseURL, {
      params: {
        api_key: apiKey,
      }
    })
    .then(response => {
      setMovies(response.data.results);
    })
      .catch(error => {
        setError(error.message);
      })
  }

  useEffect(() => {
    fetchData()
  }, []);

  if (error) {
    return ( <div className="error"><h2>{ error }</h2></div> );
  } else if (movies) {
    const items = movies.map((movie, index) =>
      <div key={index} className="movie">
        <Link to={"/movie/" + movie.id}>
          <img src={imageBaseURL + movie.poster_path}/>
          <h2>{movie.title}</h2>
        </Link>
      </div>
    );
    return (
      <div className="movies">{ items }</div>
    );
  }
}

export default MoviesList;
