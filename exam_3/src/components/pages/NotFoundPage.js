import {useEffect} from "react";

function NotFoundPage () {
  useEffect(() => {
    document.title = 'Not Found Page';
  }, []);


  return (
    <div>
      <h1>404</h1>
      <h2>Not Found Page</h2>
    </div>
  );
}

export default NotFoundPage;