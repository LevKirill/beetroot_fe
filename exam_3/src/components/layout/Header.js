import '../../css/header.css';

import MainMenu from '../nav/MainMenu';
import {Link} from "react-router-dom";
import {useState} from "react";

import Logo from '../../img/logo.svg';

const links = [
  {
    link: 'Home',
    path: '/',
  },
  {
    link: 'Movies',
    path: '/movies',
  },
  {
    link: 'About',
    path: '/about',
  },
  {
    link: 'Contacts',
    path: '/contacts',
  },
]

function Header () {
  const [isActive, setActive] = useState (false);
  function toggleBtn () {
    setActive(!isActive);
  }

  return (
    <header className={isActive ? "active" : ""}>
      <div className="wrapper">
        <Link to="/" className="logo"><img src={Logo} alt="Logo"/></Link>
        <MainMenu links={links} />
        <div
          id="searchBtn"
          className={isActive ? "icon_search icon_search__active" : "icon_search"}
          onClick={toggleBtn}
        ></div>
        <div className="hamburger"><span></span></div>
      </div>
    </header>
  );
}

export default Header;
