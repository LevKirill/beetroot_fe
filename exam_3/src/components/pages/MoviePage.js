import {useEffect} from "react";
import SingleMovie from '../layout/movies/SingleMovie';
import SimilarMovie from "../layout/movies/SimilarMovie";

function Movies () {
  useEffect(() => {
    document.title = 'Movies Page';
  }, []);


  return (
    <section className="single_movie">
      <SingleMovie />
      <SimilarMovie />
    </section>
  );
}

export default Movies;
