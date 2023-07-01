import '../../scss/header.scss';

import MainMenu from '../nav/MainMenu';
import {Link} from "react-router-dom";
import {useState} from "react";

import Logo from '../../img/logo.svg';

const links = [
  {
    link: 'Головна',
    path: '/',
  },
  {
    link: 'Фільми',
    path: '/movies',
  },
  {
    link: 'Про нас',
    path: '/about',
  },
  {
    link: 'Контакти',
    path: '/contacts',
  },
]

function Header () {
  const [isActiveSearch, setActiveSearch] = useState (false);
  const [isActiveBurger, setActiveBurger] = useState (false);
  function toggleSearch () {
    setActiveSearch(!isActiveSearch);
    if (isActiveBurger) {
      setActiveBurger(!isActiveBurger);
    }
  }

  function toggleBurger () {
    setActiveBurger(!isActiveBurger);
    if (isActiveSearch) {
      setActiveSearch(!isActiveSearch);
    }
  }

  return (
    <header className={isActiveSearch ? "active" : ""}>
      <div className="wrapper">
        <Link to="/" className="logo"><img src={Logo} alt="Logo"/></Link>
        <div
          className={isActiveBurger ? "hamburger hamburger__active" : "hamburger"}
          onClick={toggleBurger}
        ><span></span><span></span><span></span></div>
        <MainMenu links={links} />
        <div id="searchBtn" className="icon_search" onClick={toggleSearch}></div>
      </div>
    </header>
  );
}

export default Header;
