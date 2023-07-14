import {useParams, Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import NoImagePoster from '../../../img/no-image-poster.png';

import GetNoun from "../GetNoun";
import '../../../scss/all-seasons.scss'

const baseURL = 'https://api.themoviedb.org/3/tv/';
const imageBaseURL = 'https://image.tmdb.org/t/p/w200/';
const apiKey = 'ddfb10c51e93bea162e98742b4f4c826';

function SeasonsList() {
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
  }

  useEffect(() => {
    fetchData()
  }, []);

  if (error) {
    return (<div className="error"><h2>{error}</h2></div>);
  } else if (TV) {
    let release = TV.first_air_date;
    let releaseArr = release.split('-');
    releaseArr.reverse();

    let releaseLast = TV.last_air_date;
    let releaseLastArr = releaseLast.split('-');
    releaseLastArr.reverse();

    let videoIframe = <div className="movie__video  movie__video--not"></div>;
    if (video.length !== 0) {
      videoIframe = <iframe src={'https://www.youtube.com/embed/' + video[0].key} title={TV.title ? TV.title : ''}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen></iframe>;
    } else if (videoEN.length !== 0) {
      videoIframe = <iframe src={'https://www.youtube.com/embed/' + videoEN[0].key} title={TV.title ? TV.title : ''}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen></iframe>;
    }

    let posterClassName = 'movie__content--poster';
    let posterIMG = <img src={NoImagePoster} className={posterClassName} />;
    if (TV.poster_path) {
      posterIMG = <img
          src={imageBaseURL + TV.poster_path}
          className={posterClassName}
      />
    }

    const itemsSeasons = TV.seasons.map((season, index) => {
      let releaseSeason = season.air_date;
      let releaseSeasonArr = '';
      if (releaseSeason !== null) {
        releaseSeasonArr = releaseSeason.split('-');
        releaseSeasonArr.reverse();
      }

      return (
          <div key={season.id} className={"tv_season tv_season_" + season.season_number}>
            <div className="tv_season__block container">
              {season.poster_path ?
                  (<img src={imageBaseURL + season.poster_path} alt={season.name}/>) :
                  <img src={NoImagePoster} className={posterClassName} />}
              <div className="tv_season__info">
                <h3>
                  <Link to={`/tv/${id}/season/${season.season_number}`}>{season.name} <span className="icon_star">{season.vote_average}</span></Link>
                </h3>
                <h4>
                  {releaseSeasonArr !== '' ? releaseSeasonArr[2] : ''} | {season.episode_count}&nbsp;
                  {GetNoun(season.episode_count, 'серія', 'серії', 'серій')}
                </h4>
                <div className="tv_season__info--desc">
                  Сезон&nbsp;
                  {season.season_number !== 0 ? season.season_number : `"${season.name}"`} серіалу &quot;{TV.name}&quot;{releaseSeasonArr !== '' ? `, прем’єра якого відбулася ${releaseSeasonArr.join('.')}` : ''}
                </div>
              </div>
            </div>
          </div>
      );
    });

    let releaseAll = releaseArr[2] === releaseLastArr[2] ? releaseArr[2] : releaseArr[2] + '-' + releaseLastArr[2];
    TV && TV.name ? document.title = TV.name + (releaseArr[2] ? (' (TV серіал ' + releaseAll + ')') : '') +
        (TV.name !== TV.original_name ? (' ' + TV.original_name) : '') : document.title = 'Сторінка серіалу';

    return (
        <div className="tv_seasons tv_all_seasons">
          <div className="tv_title">
            <div className="container">
              {TV.poster_path ?
                  (<img src={imageBaseURL + TV.poster_path} />) :
                  <img src={NoImagePoster} className={posterClassName} />}
              <div className="tv_title__details">
                <h1><Link to={`/tv/${id}`}>{TV.name}</Link> {releaseArr.length !== 0 ? `(${releaseArr[2]})`: ''}</h1>
                <Link to={`/tv/${id}`}>← Повернутися на головну</Link>
              </div>
            </div>
          </div>
            {itemsSeasons}
        </div>
    );
  }
}

export default SeasonsList;
