import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import '../../css/single-movie.css';

const baseURL = 'https://api.themoviedb.org/3/movie/';
const imageBaseURL = 'https://image.tmdb.org/t/p/w300/';
const apiKey = 'ddfb10c51e93bea162e98742b4f4c826';

function SingleMovie() {
  const params = useParams();
  const id = params.id;
  const [movie, setMovie] = useState(null);
  const [video, setVideo] = useState(null);
  const [videoEN, setVideoEN] = useState(null);
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
  }

  useEffect(() => {
    fetchData()
  }, []);

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

    let videoLength = video.length;
    let videoENLength = videoEN.length;
    console.log(videoLength);
    console.log(videoENLength);

    let videoIframe = <div className="single_movie__video"></div>;
    if (videoLength != 0) {
      videoIframe = <iframe width="560" height="315" src={'https://www.youtube.com/embed/' + video[0].key} title={movie.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
      className={'single_movie__video'}></iframe>;
    } else if (videoENLength !== undefined) {
      videoIframe = <iframe width="560" height="315" src={'https://www.youtube.com/embed/' + videoEN[0].key} title={movie.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className={'single_movie__video'}></iframe>;
    }

    return (
      <div className="single_movie">
        <h1>{movie.title} ({releaseArr[2]}) {movie.original_title}</h1>
        <img
          src={imageBaseURL + ((movie.belongs_to_collection) ? movie.belongs_to_collection.poster_path : movie.poster_path)}
          className={'single_movie__poster'}
        />
        <p className="single_movie__vote_average icon_star">{movie.vote_average.toFixed(1)}</p>
        <p className="single_movie__genre">Жанри: {genre.join(', ')}</p>
        <p className="single_movie__runtime">Тривалість: {movie.runtime} хв</p>
        <p className="single_movie__premiere">Прем'єра: {releaseArr.join('.')}</p>
        <p className={'single_movie__desc'}>{movie.overview}</p>
        {videoIframe}
      </div>
    );
  }
}

export default SingleMovie;
