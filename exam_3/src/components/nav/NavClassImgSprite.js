import React from 'react';
import {Link} from 'react-router-dom';
import Sprite from '../../img/sprite.svg';

function mainMenu (props) {
  let navTitle;
  if (props.title) {
    navTitle = <h6>{props.title}</h6>
  }

  const listItems = props.links.map((item, index) => {
    let img;
    if (item.img) {
      img = <img src={item.img} alt={item.link ? item.link : 'img'}/>;
    }

    let svg;
    if (item.svg) {
      svg = <svg width={item.width} height={item.height}><use xlinkHref={`${props.sprite}#${item.svg}`}></use></svg>;
      img = '';
    }

    let linkName;
    if (item.link) {
      linkName = <span>{item.link}</span>;
    }
    return (
      <li key={index}>
        <Link to={item.path ? item.path : '#'}>
          {svg}
          {img}
          {linkName}
        </Link>
      </li>
    )
  });

  return (
    <nav className={props.class ? props.class : ''}>
      {navTitle}
      <ul>{ listItems }</ul>
    </nav>
  );
}

mainMenu.defaultProps = {
  class: 'nav',
  sprite: Sprite,
  title: 'Download Our App',
  links: [
    {
      link: 'Link',
      path: '/',
      svg: 'google-play',
      width: 140,
      height: 47,
    },
    {
      link: 'Link',
      path: '/',
      svg: 'app-store',
      width: 140,
      height: 47,
    },
  ]
}

export default mainMenu;
