import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import NavClassImgSprite from "../nav/NavClassImgSprite";
import ContactsPage from "../form/ContactsForm";

import '../../scss/contacts.scss';

function Contacts() {
  useEffect(() => {
    document.title = 'Контакти';
  }, []);

  const contacts = {
    class: 'contacts__info--tel_email',
    title: '',
    links: [
      {
        link: '8 800 234 56 78',
        path: 'tel:88002345678',
      },
      {
        link: 'support@flixgo.com',
        path: 'mailto:support@flixgo.com',
      },
    ]
  }
  const social = {
    class: 'contacts__info--social',
    title: '',
    links: [
      {
        class: 'icon_facebook',
        path: '#',
      },
      {
        class: 'icon_instagram',
        path: '#',
      },
      {
        class: 'icon_twitter',
        path: '#',
      },
    ]
  }

  return (
      <section className="contacts">
        <article className="page_title">
          <div className="wrapper">
            <h1>Контакти</h1>
            <div className="breadcrumbs">
              <Link to="/">Головна</Link> <span className="icon_arrow"></span> <span
                className="breadcrumbs__title">Контакти</span>
            </div>
          </div>
        </article>
        <div className="wrapper contacts__wrapper">
          <div className="contacts__info">
            <h2>Будемо на зв'язку</h2>
            <p>Ми завжди раді допомогти та надати більше інформації про наші послуги.
              Ви можете зв'язатися з нами електронною поштою, телефоном або заповнивши форму на нашому сайті.
              Дякуємо, що розглядаєте нас!</p>
            <NavClassImgSprite class={contacts.class} title={contacts.title} links={contacts.links}/>
            <NavClassImgSprite class={social.class} title={social.title} links={social.links}/>
          </div>
          <ContactsPage classForm={'contacts__form'}/>
        </div>
      </section>
  );
}

export default Contacts;
