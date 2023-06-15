import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import '../../css/movies.css';

const baseURL = 'https://api.themoviedb.org/3/discover/movie';
const imageBaseURL = 'https://image.tmdb.org/t/p/w300';
const apiKey = 'ddfb10c51e93bea162e98742b4f4c826';
const genreURL = 'https://api.themoviedb.org/3/genre/movie/list';

function MoviesList () {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [genreIDs, setGenreIDs] = useState([]);

  async function fetchData() {
    axios.get(genreURL, {
      params: {
        api_key: apiKey,
        language: 'uk',
      }
    })
      .then(response => {
        setGenreIDs(response.data.genres);
      })
      .catch(error => {
        setError(error.message);
      })

    axios.get(baseURL, {
      params: {
        api_key: apiKey,
        language: 'uk',
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
    const items = movies.map((movie, index) => {
      let genre = [];
      let genre_ids = movie.genre_ids;
      for (let i = 0; i < genre_ids.length; i++) {
        let id = genre_ids[i];
        for (let j = 0; j < genreIDs.length; j++) {
          let api_id = genreIDs[j].id;
          if (id === api_id) {
            genre.push(genreIDs[j].name);
          }
        }
      }

      return (
        <div key={index} className="movie">
          <Link to={"/movie/" + movie.id}>
            <div className="poster_img">
              <img src={imageBaseURL + movie.poster_path}/>
              <span className="icon_play"></span>
            </div>
            <div className="content">
              <h2>{movie.title}</h2>
              <p className="genre_list">{genre.join(', ')}</p>
              <p className="icon_star">{movie.vote_average}</p>
            </div>
          </Link>
        </div>
      );
    });
    return (
      <div className="movies">{ items }</div>
    );
  }
}

export default MoviesList;
