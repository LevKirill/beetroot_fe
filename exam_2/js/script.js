//Text copyright in footer
let date = new Date(),
  dateYear = date.getFullYear(),
  copyright = document.querySelector('.copyright'),
  contacts = document.querySelector('#contacts .contacts'),
  footer = document.querySelector('.footer'),
  bottom = contacts.offsetHeight / 3;

copyright.textContent = `Copyrights © ${dateYear} Montichello`;

window.initMap = initMap;

//Slider in section.main_screen
const swiper = new Swiper(".main_screen__slider", {
  direction: "vertical",
  spaceBetween: 30,
  effect: "cube",
  grabCursor: true,
  loop: true,
  cubeEffect: {
    shadow: true,
    slideShadows: true,
    shadowOffset: 20,
    shadowScale: 0.94,
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

//Slider in section.news
const swiperNews = new Swiper(".news__slider", {
  slidesPerView: 1,
  slidesPerGroup: 1,
  loop: true,
  pagination: {
    el: ".news__pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    570: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 20,
    },
    980: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 30,
    },
  },
});

// Плавна прокрутка до якоря
document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener('click', function (e) {
    // document.getElementById('hamburger').checked = false;

    e.preventDefault();

    let href = this.getAttribute('href').substring(1);

    const scrollTarget = document.getElementById(href);

    // const topOffset = document.querySelector('.main_header').offsetHeight;
    const topOffset = 70; // если не нужен отступ сверху
    const elementPosition = scrollTarget.getBoundingClientRect().top;
    const offsetPosition = elementPosition - topOffset;

    window.scrollBy({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});

//Scrollspy
window.onload = function () {
  scrollSpy('#navMain', {
    sectionSelector: 'section',
    targetSelector: 'a',
    activeClass: 'active',
    offset: 120
  });
}

//Header sticky
let element = document.querySelector('.header');
window.addEventListener('scroll', function () {
  if (window.scrollY > 53) {
    element.classList.add("header__sticky");
  } else {
    element.classList.remove("header__sticky");
  }
});

//Gallery
(function () {
  let boxes = [], els, i, l;
  if (document.querySelectorAll) {
    els = document.querySelectorAll('a[rel=simplebox]');
    Box.getStyles('simplebox_css', './css/style.css');
    Box.getScripts('simplebox_js', './js/simplebox.js', function () {
      simplebox.init();
      for (i = 0, l = els.length; i < l; ++i)
        simplebox.start(els[i]);
      simplebox.start('a[rel=simplebox_group]');
    });
  }
})();

// Google Map
let map;
function initMap() {
  map = new google.maps.Map(document.getElementById("googleMap"), {
    center: { lat: 40.6686, lng: -73.8999 },
    zoom: 17,
    mapId: '2f084b4895741534',
  });

  const marker = new google.maps.Marker({
    position: { lat: 40.6686, lng: -73.8999 },
    map: map,
    title: "Monticello",
    icon: {
      url: "https://i.postimg.cc/30jd33nS/Pin.png",
      scaledSize: new google.maps.Size(100, 100),
    },
  });
}

$(document).ready(window.initMap = initMap);

//Validation Form
$(document).ready(function() {
  $("#myForm").validate({
    rules: {
      name : {
        required: true,
        minlength: 3
      },
      email: {
        required: true,
        email: true
      },
    }
  });
});

let hamburger = $('.hamburger'),
  headerMenu = $('.header__menu');

$(document).ready(function() {
  // Optimalisation: Store the references outside the event handler:
  let $window = $(window),
    windowsize;
    indentContAndFooter($(window).width());
  function checkWidth() {
    windowsize = $window.width();
    indentContAndFooter(windowsize);
  }

  $(window).resize(checkWidth);
});

hamburger.on('click', function () {
  let linkOnClick = $('.header__menu a[href^="#"]');

  clickHamburger();

  linkOnClick.on('click', function () {
    clickHamburger();
  });
});

function indentContAndFooter (width) {
  if (width > 800) {
    contacts.style.bottom = `-${Math.round(bottom)}px`;
    footer.style.padding = `${Math.round(bottom + 54)}px 0`;
  } else {
    contacts.style.bottom = `0`;
    footer.style.padding = `1.875em 0`;
  }
}

function clickHamburger () {
  headerMenu.toggleClass('header__menu--active');
  hamburger.toggleClass('hamburger__pressed');
}
