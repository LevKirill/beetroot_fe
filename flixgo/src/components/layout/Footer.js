import React from "react";
import NavClassImgSprite from "../nav/NavClassImgSprite";
import Sprite from '../../img/sprite.svg';

import '../../scss/footer.scss';

function footer() {

  const downOurUp = {
    class: 'footer__nav--our_up',
    sprite: Sprite,
    title: 'Завантажте наш додаток',
    links: [
      {
        path: '#',
        svg: 'app-store',
        width: 140,
        height: 47,
      },
      {
        path: '#',
        svg: 'google-play',
        width: 140,
        height: 41,
      },
    ]
  }
  const resources = {
    class: 'footer__nav--resources',
    title: 'Користувачам',
    links: [
      {
        link: 'Про нас',
        path: '/about',
      },
      {
        link: 'Контакти',
        path: '/contacts',
      },
    ]
  }
  const legal = {
    class: 'footer__nav--legal',
    title: 'Основні положення',
    links: [
      {
        link: 'Умови використання',
        path: '/privacy-policy',
      },
      {
        link: 'Політика конфіденційності',
        path: '/privacy-policy',
      },
    ]
  }
  const contacts = {
    class: 'footer__nav--contacts',
    title: 'Контакти',
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
    class: 'footer__nav--social',
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
  const Year = new Date().getFullYear();

  return (
      <footer className={'footer'}>
        <section className="footer__nav">
          <div className="wrapper">
            <NavClassImgSprite class={downOurUp.class} title={downOurUp.title} sprite={downOurUp.sprite}
                               links={downOurUp.links}/>
            <NavClassImgSprite class={resources.class} title={resources.title} links={resources.links}/>
            <NavClassImgSprite class={legal.class} title={legal.title} links={legal.links}/>
            <NavClassImgSprite class={contacts.class} title={contacts.title} links={contacts.links}/>
            <NavClassImgSprite class={social.class} title={social.title} links={social.links}/>
          </div>
        </section>
        <section className="footer__bottom">
          <div className="wrapper">
            <p className="footer__bottom--copyright">© FlixGo, 2018—{Year}.</p>
          </div>
        </section>
      </footer>
  );
}

export default footer;
