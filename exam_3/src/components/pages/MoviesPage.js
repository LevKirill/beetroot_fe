import {useEffect} from "react";
import {Link} from "react-router-dom";
import MoviesList from "../layout/MoviesList";

function Movies () {
  useEffect(() => {
    document.title = 'Movies Page';
  }, []);


  return (
    <section className="page_movies">
      <article className="page_title">
        <div className="wrapper">
          <h1>Movies</h1>
          <div className="breadcrumbs">
            <Link to="/">Home</Link> <span className="icon_arrow"></span> <span className="breadcrumbs__title">Movies</span>
          </div>
        </div>
      </article>
      <article className="catalog_movies">
        <div className="block_filter">
          <div className="wrapper">Фільтри</div>
        </div>
        <div className="wrapper">
          <MoviesList />
        </div>
      </article>
    </section>
  );
}

export default Movies;
