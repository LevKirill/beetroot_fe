import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import '../../css/movies.css';
import '../../css/pagination.css';

const baseURL = 'https://api.themoviedb.org/3/discover/movie';
const imageBaseURL = 'https://image.tmdb.org/t/p/w200';
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
      if (response.data.total_pages > 500) {
        setTotalPage(500);
      } else {
        setTotalPage(response.data.total_pages);
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

      return (
        <div key={index} className="movie">
          <Link to={"/movie/" + movie.id}>
            <div className="poster_img">
              <img src={imageBaseURL + movie.poster_path}/>
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
          <Pagination count={total_page} page={page} onChange={handleChange} defaultPage={6} siblingCount={1} boundaryCount={1} />
        </Stack>
      </section>
    );
  }
}

export default MoviesList;
