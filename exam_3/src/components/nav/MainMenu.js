import React from 'react';
import {NavLink} from "react-router-dom";

function mainMenu (props) {
  const listItems = props.links.map((item, index) =>
    <li key={item.link.toString()}>
      <NavLink to={ item.path } onClick={item.onClick}>{ item.link }</NavLink>
    </li>
  );

  return (
    <nav className="menu">
      <ul>{ listItems }</ul>
    </nav>
  );
}

mainMenu.defaultProps = {
  links: [
    {
      link: 'Link',
      path: '/',
      onClick: 'toggleBurger',
    },
    {
      link: 'Link',
      path: '/',
      onClick: 'toggleBurger',
    },
  ]
}

export default mainMenu;
