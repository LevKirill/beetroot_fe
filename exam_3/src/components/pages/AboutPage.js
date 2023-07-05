import {useEffect} from "react";
function About () {
  useEffect(() => {
    document.title = 'Про нас';
  }, []);


  return (
    <div>Сторінка про нас</div>
  );
}

export default About;
