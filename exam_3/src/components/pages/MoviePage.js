import {useEffect} from "react";
import SingleMovie from '../layout/SingleMovie';

function Movies () {
  useEffect(() => {
    document.title = 'Movies Page';
  }, []);


  return (
    <SingleMovie />
  );
}

export default Movies;
