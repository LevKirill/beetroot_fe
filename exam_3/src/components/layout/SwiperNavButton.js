import React from 'react';
import { useSwiper } from 'swiper/react';

function SwiperNavButtons () {
  const swiper = useSwiper();

  return (
    <h1><b>New items</b> of this season
      <div className="swiper_nav_btns">
        <button onClick={() => swiper.slidePrev()} className="icon_arrow icon_arrow__prev"></button>
        <button onClick={() => swiper.slideNext()} className="icon_arrow icon_arrow__next"></button>
      </div>
    </h1>
  );
}

export default SwiperNavButtons;