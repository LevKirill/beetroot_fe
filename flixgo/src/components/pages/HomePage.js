import {useEffect} from "react";
import SliderMovie from "../layout/movies/SliderMovie";

function Home() {
  useEffect(() => {
    // Head Title
    document.title = 'Головна сторінка | FlixGo';
  }, []);

  return (
      <section className="main_screen">
        <SliderMovie/>
      </section>
  );
}

export default Home;
