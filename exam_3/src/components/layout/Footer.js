import React from "react";
import NavClassImgSprite from "../nav/NavClassImgSprite";
import Sprite from '../../img/sprite.svg';

function footer () {

  const downOurApp = {
    class: 'our_app',
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

  return (
    <footer>
      <div className="wrapper">
        <NavClassImgSprite class={downOurApp.class} title={downOurApp.title} sprite={downOurApp.sprite} links={downOurApp.links} />
      </div>
    </footer>
  );
}

export default footer;
