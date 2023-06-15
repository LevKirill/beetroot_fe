import {useEffect} from "react";

function Contacts () {
  useEffect(() => {
    document.title = 'Contacts Page';
  }, []);


  return (
    <div>Сторінка контактів</div>
  );
}

export default Contacts;
