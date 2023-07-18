import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import ScrollTop from "../ScrollTop";
import NoImagePoster from '../../../img/no-image-poster.png';
import '../../../scss/similar-movies.scss';

const baseURL = 'https://api.themoviedb.org/3/movie/';
const imageBaseURL = 'https://image.tmdb.org/t/p/w300/';
const apiKey = 'ddfb10c51e93bea162e98742b4f4c826';
const genreURL = 'https://api.themoviedb.org/3/genre/movie/list';

function SimularMovie() {
  const params = useParams();
  const id = params.id;
  const [movie, setMovie] = useState(null);
  const [similar, setSimilars] = useState([]);
  const [genreIDs, setGenreIDs] = useState([]);
  const [error, setError] = useState(null);

  async function fetchData() {
    axios.get(baseURL + id, {
      params: {
        api_key: apiKey,
        language: 'uk',
      }
    })
        .then(response => {
          setMovie(response.data);
        })
        .catch(error => {
          setError(error.message);
        })

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

    axios.get(baseURL + id + '/similar', {
      params: {
        api_key: apiKey,
        language: 'uk',
      }
    })
        .then(response => {
          setSimilars(response.data.results);
        })
        .catch(error => {
          setError(error.message);
        })
  }

  useEffect(() => {
    fetchData()
  }, [movie]);

  if (error) {
    return (<div className="error"><h2>{error}</h2></div>);
  } else if (movie) {

    const items = similar.map((movie, index) => {
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

      if (index < 10) {
        return (
            <div key={index} className="similar__movies--movie">
              <Link to={"/movie/" + movie.id} onClick={ScrollTop}>
                <div className="poster_img">
                  <img src={movie.poster_path ? (imageBaseURL + movie.poster_path) : NoImagePoster} alt="poster" />
                  <span className="icon_play"></span>
                </div>
                <div className="content">
                  <h3>{movie.title}</h3>
                  <p className="genre_list">{genre.join(', ')}</p>
                  <p className="icon_star">{movie.vote_average}</p>
                </div>
              </Link>
            </div>
        );
      }
    });

    if (similar.length !== 0) {
      return (
          <div className="similar">
            <div className="wrapper">
              <h2>Вам також може сподобатися</h2>
              <div className="similar__movies">{items}</div>
            </div>
          </div>
      );
    }
  }
}

export default SimularMovie;
