import {useEffect} from "react";
import MoviesList from "../layout/MoviesList";
function About () {
  useEffect(() => {
    document.title = 'About Page';
  }, []);


  return (
    <div>Сторінка про нас</div>
  );
}

export default About;
