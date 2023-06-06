import {useEffect} from "react";

function About () {
  useEffect(() => {
    document.title = 'About Page';
  }, []);


  return (
    <div>About Page</div>
  );
}

export default About;
