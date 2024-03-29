import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import NoImagePoster from '../../../img/no-image-poster.png';
import Gravatar from '../../../img/gravatar.jpg';
import '../../../scss/single-movie.scss';
import '../../../scss/rewiews.scss';

const baseURL = 'https://api.themoviedb.org/3/movie/';
const imageBaseURL = 'https://image.tmdb.org/t/p/w300/';
const imageBackURL = 'https://image.tmdb.org/t/p/w1280/';
const apiKey = 'ddfb10c51e93bea162e98742b4f4c826';

function SingleMovie() {
  const params = useParams();
  const id = params.id;
  const [movie, setMovie] = useState(null);
  const [video, setVideo] = useState([]);
  const [videoEN, setVideoEN] = useState([]);
  const [actors, setActors] = useState([]);
  const [reviews, setReviews] = useState([]);
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

    axios.get(baseURL + id + '/credits', {
      params: {
        api_key: apiKey,
      }
    })
        .then(response => {
          setActors(response.data.cast);
        })
        .catch(error => {
          setError(error.message);
        })

    axios.get(baseURL + id + '/reviews', {
      params: {
        api_key: apiKey,
      }
    })
        .then(response => {
          setReviews(response.data.results);
        })
        .catch(error => {
          setError(error.message);
        })
  }

  useEffect(() => {
    fetchData();
  }, [movie]);

  if (error) {
    return (<div className="error"><h2>{error}</h2></div>);
  } else if (movie) {
    let genre = [];
    let genres = movie.genres;
    for (let i = 0; i < genres.length; i++) {
      genre.push(genres[i].name);
    }

    let actor = [];
    for (let i = 0; i < actors.length; i++) {
      if (i < 5) {
        actor.push(actors[i].name);
      }
    }

    let release = movie.release_date;
    let releaseArr = release.split('-');
    releaseArr.reverse();

    let videoIframe = <div className="movie__video  movie__video--not"></div>;
    if (video.length !== 0) {
      videoIframe = <iframe src={'https://www.youtube.com/embed/' + video[0].key} title={movie.title ? movie.title : ''}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen></iframe>;
    } else if (videoEN.length !== 0) {
      videoIframe =
          <iframe src={'https://www.youtube.com/embed/' + videoEN[0].key} title={movie.title ? movie.title : ''}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen></iframe>;
    }

    let backIM;
    if (movie.belongs_to_collection) {
      backIM = imageBackURL + movie.belongs_to_collection.backdrop_path
    } else {
      backIM = imageBackURL + movie.poster_path
    }

    let posterClassName = 'movie__content--poster';
    let posterIMG = NoImagePoster;
    if (movie.poster_path) {
      posterIMG = imageBaseURL + movie.poster_path;
    }

    const reviewsList = reviews.map((review, index) => {
      let reviewDate = review.updated_at.substr(0, review.updated_at.indexOf("T"));
      reviewDate = reviewDate.split('-');
      reviewDate.reverse();

      let reviewTime = review.updated_at.substr(11, 5);

      return (
          <div key={index} className={'review'}>
            <div className="review__author">
              <img src={review.author_details.avatar_path !== null ? 'https://secure.gravatar.com/avatar' +
                  review.author_details.avatar_path.replace('/https://secure.gravatar.com/avatar', '') :
                  Gravatar} alt={review.author_details.name !== '' ? `Avatar ${review.author_details.name}` : 'Avatar'}
              />
              <div className="author__desc">
                <h3>{review.author_details.name ? review.author_details.name : review.author_details.username}</h3>
                <data>{reviewDate.join('.') + ' ' + reviewTime}</data>
              </div>
            </div>
            <p className="review__content" dangerouslySetInnerHTML={{__html: review.content}}/>
          </div>
      );
    });

    // Head Title
    movie && movie.title ?
        document.title = movie.title + (releaseArr[2] ? (' (' + releaseArr[2] + ')') : '') : document.title = 'Сторінка фільму';

    return (
        <>
          <article className="page_title">
            <div className="wrapper">
              <h1>{movie.title}</h1>
              <div className="breadcrumbs">
                <Link to="/">Головна</Link> <span className="icon_arrow"></span>
                <Link to="/movies">Фільми</Link> <span className="icon_arrow"></span>
                <span className="breadcrumbs__title">{movie.title}</span>
              </div>
            </div>
          </article>
          <div className="movie">
            <img src={backIM} className={'movie__back'} alt="background"/>
            <div className="wrapper">
              <h1>{movie.title} {releaseArr[2] ? ('(' + releaseArr[2] + ')') : ''}&nbsp;
                {movie.title !== movie.original_title ? movie.original_title : ''}
              </h1>
              <div className="movie__content">
                <img src={posterIMG} className={posterClassName} alt="poster"/>
                <ul className="movie__info">
                  <li className="movie__info--vote_average icon_star">{movie.vote_average.toFixed(1)}</li>
                  <li className="tv__info--genre">Жанри: <span>{genre.map((genre) => <span>{genre}</span>)}</span></li>
                  <li className="tv__info--actor">Актери: <span>{actor.map((actor) => <span>{actor}</span>)}</span></li>
                  <li className="movie__info--runtime">Тривалість:
                    <span>{movie.runtime === 0 ? 'невідома' : (movie.runtime + ' хв')}</span>
                  </li>
                  <li className="movie__info--premiere">Прем'єра:
                    <span>{releaseArr.length !== 1 && releaseArr[0] !== '' ? releaseArr.join('.') : 'невідома'}</span>
                  </li>
                </ul>
                <div className="movie__desc">
                  <p className={'movie__desc--overview'}>{movie.overview ? movie.overview : 'Нажаль, огляд поки що відсутній...'}</p>
                </div>
              </div>
              <div className="movie__video">{videoIframe}</div>
            </div>
          </div>
          {reviewsList.length !== 0 ?
              <div className="reviews">
                <div className="wrapper"><h2>Відгуки</h2>{reviewsList}</div>
              </div> : ''
          }
        </>
    );
  }
}

export default SingleMovie;
