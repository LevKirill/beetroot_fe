import React from 'react';
import {NavLink} from "react-router-dom";

function mainMenu (props) {
  const listItems = props.links.map((item, index) =>
    <li key={item.link.toString()}>
      <NavLink to={ item.path }>{ item.link }</NavLink>
    </li>
  );

  return (
    <nav>
      <ul>{ listItems }</ul>
    </nav>
  );
}

mainMenu.defaultProps = {
  links: [
    {
      link: 'Link',
      path: '/',
    },
    {
      link: 'Link',
      path: '/',
    },
  ]
}

export default mainMenu;
