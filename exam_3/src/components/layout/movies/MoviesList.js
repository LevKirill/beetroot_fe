import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import NoImagePoster from '../../../img/no-image-poster.png';
import ScrollTop from "../ScrollTop";

import '../../../scss/movies.scss';
import '../../../scss/pagination.scss';

const baseURL = 'https://api.themoviedb.org/3/discover/movie';
const imageBaseURL = 'https://image.tmdb.org/t/p/w300';
const apiKey = 'ddfb10c51e93bea162e98742b4f4c826';
const genreURL = 'https://api.themoviedb.org/3/genre/movie/list';

function MoviesList () {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [genreIDs, setGenreIDs] = useState([]);
  const [page, setPage] = useState(1);
  const [total_page, setTotalPage] = useState(1);

  async function fetchData(currentPage) {
    axios.get(genreURL, {
      params: {
        api_key: apiKey,
        page: currentPage,
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
        page: currentPage,
        language: 'uk',
      }
    })
    .then(response => {
      setMovies(response.data.results);
      let totalPages = response.data.total_pages;
      if (totalPages && totalPages <= 500) {
        setTotalPage(totalPages);
      } else {
        setTotalPage(500);
      }
    })
      .catch(error => {
        setError(error.message);
      })
  }

  useEffect(() => {
    fetchData(page)
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
    fetchData(value);
  }

  if (error) {
    return ( <div className="error"><h2>{ error }</h2></div> );
  } else if (movies) {
    const items = movies.map((movie, index) => {
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

      document.title = `Список фільмів | Сторінка ${page}`;

      return (
        <div key={index} className="movie">
          <Link to={"/movie/" + movie.id} onClick={ScrollTop}>
            <div className="poster_img">
              <img src={movie.poster_path ? (imageBaseURL + movie.poster_path) : NoImagePoster}/>
              <span className="icon_play"></span>
            </div>
            <div className="content">
              <h2>{movie.title}</h2>
              <p className="genre_list">{genre.join(', ')}</p>
              <p className="icon_star">{movie.vote_average}</p>
            </div>
          </Link>
        </div>
      );
    });
    return (
      <section className="movies_catalog">
        <div className="movies">{ items }</div>
        <Stack spacing={2} className="container_pagination">
          <Pagination
              count={total_page}
              page={page}
              onChange={handleChange}
              defaultPage={6}
              siblingCount={1}
              boundaryCount={1}
              onClick={ScrollTop}
          />
        </Stack>
      </section>
    );
  }
}

export default MoviesList;
