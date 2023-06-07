import {useEffect} from "react";
import MoviesList from "../layout/MoviesList";

function Movies () {
  useEffect(() => {
    document.title = 'Movies Page';
  }, []);


  return (
    <MoviesList />
  );
}

export default Movies;
