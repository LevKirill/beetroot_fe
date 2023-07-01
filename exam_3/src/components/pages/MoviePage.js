import {useEffect} from "react";
import SingleMovie from '../layout/SingleMovie';
import SimilarMovie from "../layout/SimilarMovie";

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
