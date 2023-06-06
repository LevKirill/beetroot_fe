import {useEffect} from "react";

function Home () {
  useEffect(() => {
    document.title = 'Home Page';
  }, []);

  return (
    <div>Home Page</div>
  );
}

export default Home;
