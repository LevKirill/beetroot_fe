import {useEffect} from "react";
import SliderMovie from "../layout/SliderMovie";
function Home () {
  useEffect(() => {
    document.title = 'Home Page';
  }, []);

  return (
    <section className="main_screen">
      <SliderMovie />
    </section>
);
}

export default Home;
