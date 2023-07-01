import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import NoImagePoster from '../../img/no-image-poster.png';
import '../../css/single-movie.css';
import '../../css/similar-movies.css';

const baseURL = 'https://api.themoviedb.org/3/movie/';
const imageBaseURL = 'https://image.tmdb.org/t/p/w300/';
const imageBackURL = 'https://image.tmdb.org/t/p/w1280/';
const apiKey = 'ddfb10c51e93bea162e98742b4f4c826';
const genreURL = 'https://api.themoviedb.org/3/genre/movie/list';

function SingleMovie() {
  const params = useParams();
  const id = params.id;
  const [movie, setMovie] = useState(null);
  const [video, setVideo] = useState([]);
  const [videoEN, setVideoEN] = useState([]);
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

    axios.get(baseURL + id + '/videos', {
      params: {
        api_key: apiKey,
        language: 'uk',
      }
    })
      .then(response => {
        setVideo(response.data.results);
      })
      .catch(error => {
        setError(error.message);
      })

    axios.get(baseURL + id + '/videos', {
      params: {
        api_key: apiKey,
      }
    })
      .then(response => {
        setVideoEN(response.data.results);
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
    let genre = [];
    let genres = movie.genres;
    for (let i = 0; i < genres.length; i++) {
      genre.push(genres[i].name);
    }

    let release = movie.release_date;
    let releaseArr = release.split('-');
    releaseArr.reverse();

    let videoIframe = <div className="movie__video"></div>;
    if (video.length !== 0) {
      videoIframe = <iframe width="560" height="315" src={'https://www.youtube.com/embed/' + video[0].key} title={movie.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
      className={'movie__video'}></iframe>;
    } else if (videoEN.length !== 0) {
      videoIframe = <iframe width="560" height="315" src={'https://www.youtube.com/embed/' + videoEN[0].key} title={movie.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className={'movie__video'}></iframe>;
    }

    let backIM;
    if (movie.belongs_to_collection) {
      backIM = <img
        src={imageBackURL + movie.belongs_to_collection.backdrop_path}
        className={'movie__back'}
      />
    } else {
      backIM = <img
        src={imageBackURL + movie.poster_path}
        className={'movie__back'}
      />
    }

    let posterClassName = 'movie__content--poster';
    let posterIMG = <img src={NoImagePoster} className={posterClassName} />;
    if (movie.belongs_to_collection) {
      posterIMG = <img
        src={imageBaseURL + movie.belongs_to_collection.poster_path}
        className={posterClassName}
      />
    } else if (movie.poster_path) {
      posterIMG = <img
        src={imageBaseURL + movie.poster_path}
        className={posterClassName}
      />
    }

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
            <Link to={"/movie/" + movie.id}>
              <div className="poster_img">
                <img src={movie.poster_path ? (imageBaseURL + movie.poster_path) : NoImagePoster}/>
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

    return (
      <section className="single_movie">
        <div className="movie">
        {backIM}
        <div className="wrapper">
          <h1>{movie.title} {releaseArr[2] ? ('(' + releaseArr[2] + ')') : ''}
            {movie.title !== movie.original_title ? (' ' + movie.original_title) : ''}
          </h1>
          <div className="movie__content">
            {posterIMG}
            <ul className="movie__info">
              <li className="movie__info--vote_average icon_star">{movie.vote_average.toFixed(1)}</li>
              <li className="movie__info--genre">Жанри: <span>{genre.join(', ')}</span></li>
              <li className="movie__info--runtime">Тривалість:
                <span>{movie.runtime === 0 ? 'невідома' : (movie.runtime + ' хв')}</span>
              </li>
              <li className="movie__info--premiere">Прем'єра:
                <span>{releaseArr.length !== 1 &&  releaseArr[0] !== '' ? releaseArr.join('.') : 'невідома'}</span>
              </li>
            </ul>
            <div className="movie__desc">
              <p className={'movie__desc--overview'}>{movie.overview ? movie.overview : 'Нажаль, огляд поки що відсутній...'}</p>
            </div>
          </div>
          {videoIframe}
        </div>
      </div>
        <div className="similar">
          <div className="wrapper">
            <h2>Вам також може сподобатися</h2>
            <div className="similar__movies">{ items }</div>
          </div>
        </div>
      </section>
    );
  }
}

export default SingleMovie;
