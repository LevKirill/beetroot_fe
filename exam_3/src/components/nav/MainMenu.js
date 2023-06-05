import React from 'react';

function mainMenu (props) {
  const listItems = props.links.map((item, index) =>
    <li key={item.link.toString()}>
      <a href={ item.path }>{ item.link }</a>
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
