import {useEffect} from "react";
import SingleMovie from '../layout/SingleMovie';

function Movies () {
  useEffect(() => {
    document.title = 'Movies Page';
  }, []);


  return (
    <section className="single_movie">
      <div className="wrapper">
        <SingleMovie />
      </div>
    </section>
  );
}

export default Movies;
