import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import NoImagePoster from '../../../img/no-image-poster.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, EffectFlip} from 'swiper';
import SwiperNavButtons from "../SwiperNavButton";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/effect-flip";

import '../../../scss/main-screen.scss';

const baseURL = 'https://api.themoviedb.org/3/movie/upcoming';
const imageBaseURL = 'https://image.tmdb.org/t/p/w300';
const imageOriginalURL = 'https://image.tmdb.org/t/p/w1280';
const genreURL = 'https://api.themoviedb.org/3/genre/movie/list';
const apiKey = 'ddfb10c51e93bea162e98742b4f4c826';

function SliderMovie () {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [genreIDs, setGenreIDs] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

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
              <div className="swiper_movies__poster">
                <img src={movie.poster_path ? (imageBaseURL + movie.poster_path) : NoImagePoster}/>
              </div>
              <h2>{movie.title}</h2>
              <p className="genre_list">{genre.join(', ')}</p>
              <p className="icon_star">{movie.vote_average}</p>
            </Link>
          </SwiperSlide>
        )
      }
    });


    const sliderBack = movies.map((movie, index) => {
      if (index < 12) {
        if (movie.backdrop_path) {
          return (
            <SwiperSlide key={index} className="slide_back">
              <img src={imageOriginalURL + movie.backdrop_path} className="swiper_movies__back" />
            </SwiperSlide>
          )
        }
      }
    });
    return (
      <div className="container">
        <Swiper
          onSwiper={setThumbsSwiper}
          effect={"flip"}
          loop={true}
          allowTouchMove={false}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs, EffectFlip]}
          className="swiper_movies_back"
        >
          {sliderBack}
        </Swiper>

        <div className="wrapper">
          <Swiper
            loop={true}
            spaceBetween={0}
            slidesPerView={1}
            thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
            modules={[FreeMode, Navigation, Thumbs]}
            className="swiper_movies"
            breakpoints={{
              360: {
                spaceBetween: 20,
                slidesPerView: 2,
              },
              680: {
                spaceBetween: 30,
                slidesPerView: 3,
              },
              980: {
                spaceBetween: 40,
                slidesPerView: 4,
              },
            }}
          >
            <h1><span><b>Новинки</b> цього сезону</span><SwiperNavButtons /></h1>
            {sliderItems}
          </Swiper>
        </div>
      </div>
    );
  }
}

export default SliderMovie;
