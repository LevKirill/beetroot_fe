import {useEffect} from "react";
import {Link} from "react-router-dom";
import TVList from "../layout/tv/TVList";

function Movies() {
  useEffect(() => {
    // Head Title
    document.title = 'TV Serials Page';
  }, []);


  return (
      <section className="page_movies">
        <article className="page_title">
          <div className="wrapper">
            <h1>Серіали</h1>
            <div className="breadcrumbs">
              <Link to="/">Головна</Link> <span className="icon_arrow"></span> <span
                className="breadcrumbs__title">Серіали</span>
            </div>
          </div>
        </article>
        <article className="catalog_movies">
          <div className="wrapper">
            <TVList/>
          </div>
        </article>
      </section>
  );
}

export default Movies;
