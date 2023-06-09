import {Outlet} from "react-router-dom";
import Header from "./Header";
import Search from "./Search";
import Footer from "./Footer";

function Layout () {
  return (
    <div>
      <Header />
      <Search />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
