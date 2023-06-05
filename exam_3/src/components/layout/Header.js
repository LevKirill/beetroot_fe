import MainMenu from '../nav/MainMenu';

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


function header () {
  return (
    <header>
      <MainMenu links={links} />
    </header>
  );
}

export default header;
