import {useParams, Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import NoImagePoster from '../../../img/no-image-poster.png';
import GetNoun from "../GetNoun";
import '../../../scss/single-movie.scss';
import '../../../scss/tv-seasons.scss';

const baseURL = 'https://api.themoviedb.org/3/tv/';
const imageBaseURL = 'https://image.tmdb.org/t/p/w200/';
const imageBackURL = 'https://image.tmdb.org/t/p/w1280/';
const apiKey = 'ddfb10c51e93bea162e98742b4f4c826';
const genreURL = 'https://api.themoviedb.org/3/genre/tv/list';

function SingleTV() {
  const params = useParams();
  const id = params.id;
  const [TV, setTV] = useState(null);
  const [video, setVideo] = useState([]);
  const [videoEN, setVideoEN] = useState([]);
  const [error, setError] = useState(null);

  async function fetchData() {
    axios.get(baseURL + id, {
      params: {
        api_key: apiKey,
        language: 'uk',
      }
    })
      .then(response => {
        setTV(response.data);
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
  }

  useEffect(() => {
    fetchData()
  }, []);

  if (error) {
    return (<div className="error"><h2>{error}</h2></div>);
  } else if (TV) {
    let genre = [];
    let genres = TV.genres;
    for (let i = 0; i < genres.length; i++) {
      genre.push(genres[i].name);
    }

    let release = TV.first_air_date;
    let releaseArr = release.split('-');
    releaseArr.reverse();

    let videoIframe = <div className="movie__video  movie__video--not"></div>;
    if (video.length !== 0) {
      videoIframe = <iframe width="560" height="315" src={'https://www.youtube.com/embed/' + video[0].key} title={TV.title ? TV.title : ''}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
      className={'movie__video'}></iframe>;
    } else if (videoEN.length !== 0) {
      videoIframe = <iframe width="560" height="315" src={'https://www.youtube.com/embed/' + videoEN[0].key} title={TV.title ? TV.title : ''}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className={'movie__video'}></iframe>;
    }

    let backIM;
    if (TV.backdrop_path) {
      backIM = <img
        src={imageBackURL + TV.backdrop_path}
        className={'movie__back'}
      />
    } else {
      backIM = <img
        src={imageBackURL + TV.poster_path}
        className={'movie__back'}
      />
    }

    let posterClassName = 'movie__content--poster';
    let posterIMG = <img src={NoImagePoster} className={posterClassName} />;
    if (TV.poster_path) {
      posterIMG = <img
        src={imageBaseURL + TV.poster_path}
        className={posterClassName}
      />
    }
    let seasonLast;
    let lastSeason = TV.seasons;
    for (let i = lastSeason.length - 1; i >= lastSeason.length - 1; i--) {
        let releaseSeason = TV.seasons[i].air_date;
        let releaseSeasonArr = releaseSeason.split('-');
        releaseSeasonArr.reverse();

        seasonLast = <div className={"tv_season tv_season_" + TV.seasons[i].season_number}>
          <h2>Останній сезон</h2>
          <div className="tv_season__block">
            {TV.seasons[i].poster_path ?
              (<img src={imageBaseURL + TV.seasons[i].poster_path} alt={TV.seasons[i].name}/>) :
              <img src={NoImagePoster} className={posterClassName} />}
            <div className="tv_season__info">
              <h3>
                {TV.seasons[i].name} <span className="icon_star">{TV.seasons[i].vote_average}</span>
              </h3>
              <h4>
                {releaseSeasonArr[2]} | {TV.seasons[i].episode_count}&nbsp;
                {GetNoun(TV.seasons[i].episode_count, 'серія', 'серії', 'серій')}
              </h4>
              <div className="tv_season__info--desc">
                Сезон&nbsp;
                {TV.seasons[i].season_number} серіалу &quot;{TV.name}&quot;, прем’єра якого відбулася {releaseSeasonArr.join('.')}
              </div>
            </div>
          </div>
          {(TV.seasons.length === 0 || TV.seasons.length === 1) ? '' : <Link to={'#'}>Переглянути всі сезони</Link>}
        </div>
    }

    return (
      <>
        <div className="tv">
          {backIM}
          <div className="wrapper">
            <h1>{TV.name} {releaseArr[2] ? ('(' + releaseArr[2] + ')') : ''}
              {TV.name !== TV.original_name ? (' ' + TV.original_name) : ''}
            </h1>
            <div className="tv__content">
              {posterIMG}
              <ul className="tv__info">
                <li className="tv__info--vote_average icon_star">{TV.vote_average.toFixed(1)}</li>
                <li className="tv__info--genre">Жанри: <span>{genre.join(', ')}</span></li>
                <li className="tv__info--runtime">Тривалість епізоду:
                  <span>{TV.episode_run_time.length === 0 ? 'невідома' : (TV.episode_run_time + ' хв')}</span>
                </li>
                <li>Кількість сезонів: <span>{TV.number_of_seasons ? TV.number_of_seasons : 'невідоме'}</span></li>
                <li>Кількість серій: <span>{TV.number_of_episodes ? TV.number_of_episodes : 'невідоме'}</span></li>
                <li className="tv__info--premiere">Прем'єра:
                  <span>{releaseArr.length !== 1 &&  releaseArr[0] !== '' ? releaseArr.join('.') : 'невідома'}</span>
                </li>
              </ul>
              <div className="tv__desc">
                <p className={'tv__desc--overview'}>{TV.overview ? TV.overview : 'Нажаль, огляд поки що відсутній...'}</p>
              </div>
            </div>
            {videoIframe}
          </div>
        </div>
        <div className="tv_seasons">
          <div className="wrapper">
            {seasonLast}
          </div>
        </div>
      </>
    );
  }
}

export default SingleTV;
