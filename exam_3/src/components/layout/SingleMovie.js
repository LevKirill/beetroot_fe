import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const baseURL = 'https://api.themoviedb.org/3/movie/';
const imageBaseURL = 'https://image.tmdb.org/t/p/w300/';
const apiKey = 'ddfb10c51e93bea162e98742b4f4c826';

function SingleMovie () {
  const params = useParams();
  const id = params.id;
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  async function fetchData() {
    axios.get(baseURL + id, {
      params: {
        api_key: apiKey,
      }
    })
    .then(response => {
      setMovie(response.data);
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
  } else if (movie) {
      return (
        <div className="movie">
          <img src={imageBaseURL + ((movie.belongs_to_collection) ? movie.belongs_to_collection.poster_path : movie.poster_path)}/>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
        </div>
      );
  }
}

export default SingleMovie;
