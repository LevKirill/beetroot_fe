import {useEffect} from "react";

function Contacts () {
  useEffect(() => {
    document.title = 'Contacts Page';
  }, []);


  return (
    <div>Contacts Page</div>
  );
}

export default Contacts;
