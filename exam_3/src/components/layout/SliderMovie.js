import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import MoviesList from "./MoviesList";

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFlip, Autoplay, A11y, Navigation, Pagination} from 'swiper';
import SwiperNavButtons from "./SwiperNavButton";
import 'swiper/css';
import 'swiper/css/pagination';
import "swiper/css/effect-flip";

import '../../css/main-screen.css';

const baseURL = 'https://api.themoviedb.org/3/movie/upcoming';
const imageBaseURL = 'https://image.tmdb.org/t/p/w300';
const imageOriginalURL = 'https://image.tmdb.org/t/p/w1280';
const genreURL = 'https://api.themoviedb.org/3/genre/movie/list';
const apiKey = 'ddfb10c51e93bea162e98742b4f4c826';

function SliderMovie () {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [genreIDs, setGenreIDs] = useState([]);

  async function fetchData() {
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

    axios.get(baseURL, {
      params: {
        api_key: apiKey,
        language: 'uk',
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
    const sliderItems = movies.map((movie, index) => {
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

      if (index < 12) {
        return (
          <SwiperSlide key={index} className="slide_movie">
            <Link to={"/movie/" + movie.id}>
              <img src={imageBaseURL + movie.poster_path} className="swiper_movies__poster"/>
              <h2>{movie.title}</h2>
              <p className="genre_list">{genre.join(', ')}</p>
              <p className="icon_star">{movie.vote_average}</p>
            </Link>
          </SwiperSlide>
        )
      }
    });


    const sliderBack = movies.map((movie, index) => {
      if (index < 9) {
        if (movie.backdrop_path) {
          return (
            <SwiperSlide key={index} className="slide_back">
              <img src={imageOriginalURL + movie.backdrop_path} className="swiper_movies__back"/>
            </SwiperSlide>
          )
        }
      }
    });
    return (
      <div className="container">
        <Swiper
          className="swiper_movies_back"
          centeredSlides={true}
          effect={"flip"}
          loop={true}
          allowTouchMove={false}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, EffectFlip]}
        >
          {sliderBack}
        </Swiper>

        <div className="wrapper">
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            className="swiper_movies"
            spaceBetween={40}
            slidesPerView={4}
            loop={true}
          >
            <h1><b>Новинки</b> цього сезону<SwiperNavButtons /></h1>
            {sliderItems}
          </Swiper>
        </div>
      </div>
    );
  }
}

export default SliderMovie;
