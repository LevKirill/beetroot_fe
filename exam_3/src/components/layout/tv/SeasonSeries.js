import {useParams, Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import NoImage from '../../../img/no-image.jpg';
import NoImagePoster from '../../../img/no-image-poster.png';

import '../../../scss/episodes.scss';

const baseURL = 'https://api.themoviedb.org/3/tv/';
const imageBaseURL = 'https://image.tmdb.org/t/p/w200';
const apiKey = 'ddfb10c51e93bea162e98742b4f4c826';

function SeasonSeries() {
  const params = useParams();
  const id = params.id;
  const numEpisode = params.episode;
  const [episodesID, setEpisodesID] = useState(null);
  const [TV, setTV] = useState(null);
  const [error, setError] = useState(null);

  async function fetchData() {
    axios.get(baseURL + id + '/season/' + numEpisode, {
      params: {
        api_key: apiKey,
        language: 'uk',
      }
    })
        .then(response => {
          setEpisodesID(response.data);
        })
        .catch(error => {
          setError(error.message);
        })

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
  } else if (episodesID) {
    let numEpisodes = 0;
    let date;
    const episodesList = episodesID.episodes.map((episode, index) => {
      numEpisodes++;

      date = episode.air_date;
      if (date) {
        date = date.split('-');
        date = date.reverse();
      }

      return (
          <div key={index} className="episode">
            <h3><span>{episode.episode_number + '. ' + episode.name ? episode.name : ''}</span></h3>
            <div className="episode__still_image">
              <img src={episode.still_path ? imageBaseURL + episode.still_path : NoImage}
                   alt={episode.name ? episode.name : ''}/>
            </div>
            <div className="episode__details">
              <data>{episode.air_date ? date.join('.') : ''}</data>
              <p className="runtime">Тривалисть
                серії: <span>{episode.runtime ? `${episode.runtime} хв.` : 'Невідомо'}</span></p>
              {episode.overview !== '' ? <p>episode.overview</p> : ''}
            </div>
          </div>
      );
    });

    return (
        <div className="episodes">
          <div className="episode_title">
            <div className="wrapper">
              <img src={episodesID.poster_path ? imageBaseURL + episodesID.poster_path : NoImagePoster}
                   alt={episodesID.episodes.name ? episodesID.episodes.name : 'Still image'}
              />
              <div className="episode_title__details">
                <h1>
                  <Link to={`/tv/${id}/seasons`}>{TV.name}:
                    Сезон {numEpisode !== '0' ? numEpisode : 'Спеціальне'}</Link>
                  &nbsp;{date !== null ? `(${date[2]})` : ''}
                </h1>
                <p className={'num_episodes'}>Кількість серій: <span>{numEpisodes}</span></p>
                <Link to={`/tv/${id}/seasons`}>← Повернутися до списку сезонів</Link>
              </div>
            </div>
          </div>
          <div className="wrapper episodes__wrapper">
            {episodesList}
          </div>
        </div>
    );
  }
}

export default SeasonSeries;
