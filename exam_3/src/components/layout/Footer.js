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

function footer () {
  return (
    <footer>
      <MainMenu links={links} />
    </footer>
  );
}

export default footer;
