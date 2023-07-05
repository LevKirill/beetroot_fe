import {useEffect} from "react";

function Contacts () {
  useEffect(() => {
    document.title = 'Контакти';
  }, []);


  return (
    <div>Сторінка контактів</div>
  );
}

export default Contacts;
