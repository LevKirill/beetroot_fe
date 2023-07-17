import {useEffect} from "react";
import {Link} from "react-router-dom";
import MoviesList from "../layout/movies/MoviesList";

function Movies() {
  useEffect(() => {
    document.title = 'Movies Page';
  }, []);

  return (
      <section className="page_movies">
        <article className="page_title">
          <div className="wrapper">
            <h1>Фільми</h1>
            <div className="breadcrumbs">
              <Link to="/">Головна</Link> <span className="icon_arrow"></span> <span
                className="breadcrumbs__title">Фільми</span>
            </div>
          </div>
        </article>
        <article className="catalog_movies">
          <div className="wrapper">
            <MoviesList/>
          </div>
        </article>
      </section>
  );
}

export default Movies;
