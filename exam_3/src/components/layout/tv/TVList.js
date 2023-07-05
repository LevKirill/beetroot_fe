import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import NoImagePoster from '../../../img/no-image-poster.png';
import ScrollTop from "../ScrollTop";

import '../../../scss/movies.scss';
import '../../../scss/pagination.scss';
import ScrollToTop from "../ScrollTop";

const baseURL = 'https://api.themoviedb.org/3/discover/tv';
const imageBaseURL = 'https://image.tmdb.org/t/p/w300';
const apiKey = 'ddfb10c51e93bea162e98742b4f4c826';
const genreURL = 'https://api.themoviedb.org/3/genre/tv/list';

function TVList () {
  const [TV, setTV] = useState(null);
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
      setTV(response.data.results);
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
  } else if (TV) {
    const items = TV.map((tv, index) => {
      let genre = [];
      let genre_ids = tv.genre_ids;
      for (let i = 0; i < genre_ids.length; i++) {
        let id = genre_ids[i];
        for (let j = 0; j < genreIDs.length; j++) {
          let api_id = genreIDs[j].id;
          if (id === api_id) {
            genre.push(genreIDs[j].name);
          }
        }
      }

      document.title = `Список серіалів | Сторінка ${page}`;

      return (
        <div key={index} className="movie">
          <Link to={"/tv/" + tv.id} onClick={ScrollToTop}>
            <div className="poster_img">
              <img src={tv.poster_path ? (imageBaseURL + tv.poster_path) : NoImagePoster}/>
              <span className="icon_play"></span>
            </div>
            <div className="content">
              <h2>{tv.name}</h2>
              <p className="genre_list">{genre.join(', ')}</p>
              <p className="icon_star">{tv.vote_average}</p>
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
              siblingCount={1}
          />
        </Stack>
      </section>
    );
  }
}

export default TVList;
