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

    let posterClassName = 'movie__content--poster';

    const itemsSeasons = TV.seasons.map((season, index) => {
      let releaseSeason = season.air_date;
      let releaseSeasonArr = '';
      if (releaseSeason !== null) {
        releaseSeasonArr = releaseSeason.split('-');
        releaseSeasonArr.reverse();
      }

      return (
          <div key={index} className={"tv_season tv_season_" + season.season_number}>
            <div className="tv_season__block container">
              <img src={season.poster_path ? imageBaseURL + season.poster_path : NoImagePoster}
                   className={posterClassName}
                   alt={season.name ? season.name : 'poster'}
              />
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
              <img src={TV.poster_path ? imageBaseURL + TV.poster_path : NoImagePoster}
                   className={posterClassName}
                   alt={TV.name ? TV.name : 'poster'}
              />
              <div className="tv_title__details">
                <h1><Link to={`/tv/${id}`}>{TV.name}</Link> {releaseArr.length !== 0 ? `(${releaseArr[2]})`: ''}</h1>
                <Link to={`/tv/${id}`}>← Повернутися на серіал</Link>
              </div>
            </div>
          </div>
            {itemsSeasons}
        </div>
    );
  }
}

export default SeasonsList;
