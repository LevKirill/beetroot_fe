import '../../scss/header.scss';

import MainMenu from '../nav/MainMenu';
import {Link} from "react-router-dom";
import {useState} from "react";

import Logo from '../../img/logo.svg';

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

  const links = [
    {
      link: 'Головна',
      path: '/',
      onClick: toggleBurger,
    },
    {
      link: 'Фільми',
      path: '/movies',
      onClick: toggleBurger,
    },
    {
      link: 'Серіали',
      path: '/tv',
      onClick: toggleBurger,
    },
    {
      link: 'Про нас',
      path: '/about',
      onClick: toggleBurger,
    },
    {
      link: 'Контакти',
      path: '/contacts',
      onClick: toggleBurger,
    },
  ]

  const currentUrl = window.location.pathname;
  let iconSearch = '';
  if (currentUrl === '/movies' || currentUrl === '/tv') {
    iconSearch = <div id="searchBtn" className="icon_search" onClick={toggleSearch}></div>;
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
        {iconSearch}
      </div>
    </header>
  );
}

export default Header;
