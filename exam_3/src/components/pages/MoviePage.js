import SingleMovie from '../layout/movies/SingleMovie';
import SimilarMovie from "../layout/movies/SimilarMovie";

function Movies() {
  return (
      <section className="single_movie">
        <SingleMovie/>
        <SimilarMovie/>
      </section>
  );
}

export default Movies;
