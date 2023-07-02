import {useEffect} from "react";
import SingleTV from "../layout/tv/SingleTV";

function Movies () {
  useEffect(() => {
    document.title = 'Movies Page';
  }, []);


  return (
    <section className="single_tv">
      <SingleTV />
    </section>
  );
}

export default Movies;
