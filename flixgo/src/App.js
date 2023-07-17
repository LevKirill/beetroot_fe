import 'reset-css';
import './scss/main.scss';
import HomePage from './components/pages/HomePage';
import MoviesPage from './components/pages/MoviesPage';
import MoviePage from "./components/pages/MoviePage";
import AboutPage from './components/pages/AboutPage';
import ContactsPage from './components/pages/ContactsPage';
import TVPage from "./components/pages/TVPage";
import TVSinglePage from "./components/pages/TVSinglePage";
import SeasonsList from "./components/layout/tv/SeasonsList";
import SeasonSeries from "./components/layout/tv/SeasonSeries";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import NotFoundPage from './components/pages/NotFoundPage';

import {Routes, Route} from "react-router-dom";
import Layout from "./components/layout/Layout";

function App() {
  return (
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<HomePage/>}/>
          <Route path='/movies' element={<MoviesPage/>}/>
          <Route path="/movie/:id" element={<MoviePage/>}/>
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='/contacts' element={<ContactsPage/>}/>
          <Route path='/tv' element={<TVPage/>}/>
          <Route path='/tv/:id' element={<TVSinglePage/>}/>
          <Route path='/tv/:id/seasons' element={<SeasonsList/>}/>
          <Route path='/tv/:id/season/:episode' element={<SeasonSeries/>}/>
          <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
          <Route path='*' element={<NotFoundPage/>}/>
        </Route>
      </Routes>
  );
}

export default App;
