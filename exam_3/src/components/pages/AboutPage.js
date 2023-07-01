import {useEffect} from "react";
function About () {
  useEffect(() => {
    document.title = 'About Page';
  }, []);


  return (
    <div>Сторінка про нас</div>
  );
}

export default About;
