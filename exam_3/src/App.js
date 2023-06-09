import 'reset-css';
import './css/style.css';
import HomePage from './components/pages/HomePage';
import MoviesPage from './components/pages/MoviesPage';
import AboutPage from './components/pages/AboutPage';
import ContactsPage from './components/pages/ContactsPage';

import NotFoundPage from './components/pages/NotFoundPage';
import {Routes, Route} from "react-router-dom";
import Layout from "./components/layout/Layout";
import SingleMovie from "./components/layout/SingleMovie";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />}/>
        <Route path='/movies' element={<MoviesPage />}/>
        <Route path="/movie/:id" element={<SingleMovie />} />
        <Route path='/about' element={<AboutPage />}/>
        <Route path='/contacts' element={<ContactsPage />}/>
        <Route path='*' element={<NotFoundPage />}/>
      </Route>
    </Routes>
  );
}

export default App;
