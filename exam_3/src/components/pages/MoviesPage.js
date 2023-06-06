import {useEffect} from "react";

function Movies () {
  useEffect(() => {
    document.title = 'Movies Page';
  }, []);


  return (
    <div>Movies Page</div>
  );
}

export default Movies;
