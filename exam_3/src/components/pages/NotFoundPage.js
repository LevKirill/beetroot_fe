import {useEffect} from "react";
import {Link} from "react-router-dom";
import '../../css/not-found.css';

function NotFoundPage () {
  useEffect(() => {
    document.title = 'Not Found Page';
  }, []);


  return (
    <section className="not_found">
      <div className="not_found__content">
        <h1>404</h1>
        <p>The page you are looking for not available!</p>
        <Link to="/">Go back</Link>
      </div>
    </section>
  );
}

export default NotFoundPage;
