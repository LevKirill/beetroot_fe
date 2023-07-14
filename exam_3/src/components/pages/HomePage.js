import {useEffect} from "react";
import SliderMovie from "../layout/movies/SliderMovie";
function Home () {
  useEffect(() => {
    document.title = 'Головна сторінка | FlixGo';
  }, []);

  return (
    <section className="main_screen">
      <SliderMovie />
    </section>
);
}

export default Home;
