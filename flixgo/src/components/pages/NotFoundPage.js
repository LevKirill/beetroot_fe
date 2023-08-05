import {useEffect} from "react";
import {Link} from "react-router-dom";
import '../../scss/not-found.scss';

function NotFoundPage() {
  useEffect(() => {
    document.title = 'Not Found Page';
  }, []);


  return (
      <section className="not_found">
        <div className="not_found__content">
          <h1>404</h1>
          <p>Сторінка, яку ви шукаєте, недоступна!</p>
          <Link to="/">Повернутися на головну</Link>
        </div>
      </section>
  );
}

export default NotFoundPage;
