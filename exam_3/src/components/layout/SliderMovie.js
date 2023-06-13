import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, NavLink} from "react-router-dom";

import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination} from 'swiper';
import SwiperNavButtons from "./SwiperNavButton";
import 'swiper/css';
import 'swiper/css/pagination';

import '../../css/main-screen.css';

const baseURL = 'https://api.themoviedb.org/3/movie/upcoming';
const imageBaseURL = 'https://image.tmdb.org/t/p/w300';
const imageOriginalURL = 'https://image.tmdb.org/t/p/original';
const genreURL = 'https://api.themoviedb.org/3/genre/movie/list';
const apiKey = 'ddfb10c51e93bea162e98742b4f4c826';

function SliderMovie () {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);

  async function fetchData() {
    axios.get(baseURL, {
      params: {
        api_key: apiKey,
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
    const sliderItems = movies.map((movie, index) =>
      <SwiperSlide key={index} className="slide_movie"  >
        <Link to={"/movie/" + movie.id}>
          <img src={imageBaseURL + movie.poster_path}  className="swiper_movies__poster"/>
          <h2>{movie.title}</h2>
          <p className="icon_star">{movie.vote_average}</p>
          <p className="genre_list">{movie.genre_ids}</p>
        </Link>
      </SwiperSlide>
    );
    return (
      <div className="wrapper">
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          className="swiper_movies"
          spaceBetween={40}
          slidesPerView={4}
          loop={true}
        >
          <SwiperNavButtons />
          {sliderItems}
        </Swiper>
      </div>
    );
  }
}

export default SliderMovie;
