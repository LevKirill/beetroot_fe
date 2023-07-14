import {useParams, Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import NoImage from '../../../img/no-image.jpg';

const baseURL = 'https://api.themoviedb.org/3/tv/';
const imageBaseURL = 'https://image.tmdb.org/t/p/w200/';
const apiKey = 'ddfb10c51e93bea162e98742b4f4c826';

function SeasonSeries () {
  const params = useParams();
  const id = params.id;
  const numEpisode = params.episode;
  const [episodes, setEpisodes] = useState(null);
  const [error, setError] = useState(null);

  async function fetchData() {
    axios.get(baseURL + id + '/season/' + numEpisode, {
      params: {
        api_key: apiKey,
        language: 'uk',
      }
    })
        .then(response => {
          setEpisodes(response.data.episodes);
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
  } else if (episodes) {
    let numEpisodes;
    const episodesList = episodes.map((episode, index) => {
      numEpisodes = episode.episode_number;

      let date = episode.air_date;
      if (date) {
        date = date.split('-');
        date = date.reverse();
      }

      return (
          <div key={episode.id} className="episode">
            {episode.still_path ? <img src={imageBaseURL + episode.still_path} alt={episode.name}/> :
                <img src={NoImage} alt={episode.name}/>}
            <div className="episode__details">
              <h3><span>{episode.episode_number + '.' + episode.name}</span><span>{episode.air_date ? date.join('.') : ''}</span></h3>
              <p className="runtime">Тривалисть серії: {episode.runtime} хв.</p>
              {episode.overview !== '' ? <p>episode.overview</p> : ''}
            </div>
          </div>
      );
    });

    return (
        <div className="episodes">
          <div className="wrapper">
            <h2 className={'numEpisodes'}>Кількість серій: <span>{numEpisodes}</span></h2>
            {episodesList}
          </div>
        </div>
    );
  }
}

export default SeasonSeries;
