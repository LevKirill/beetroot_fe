//Text copyright in footer
let date = new Date(),
  dateYear = date.getFullYear(),
  copyright = document.querySelector('.copyright'),
  contacts = document.querySelector('#contacts .contacts'),
  footer = document.querySelector('.footer'),
  bottom = contacts.offsetHeight / 3;

copyright.textContent = `Copyrights © ${dateYear} Montichello`;
contacts.style.bottom = `-${Math.round(bottom)}px`;
footer.style.padding = `${Math.round(bottom + 54)}px 0`;

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
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // breakpoints: {
  //   640: {
  //     slidesPerView: 2,
  //     spaceBetween: 20,
  //   },
  //   768: {
  //     slidesPerView: 4,
  //     spaceBetween: 40,
  //   },
  //   1024: {
  //     slidesPerView: 5,
  //     spaceBetween: 50,
  //   },
  // },
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
  var boxes = [], els, i, l;
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

//Scrollspy
window.onload = function () {
  scrollSpy('#navMain', {
    sectionSelector: 'section',
    targetSelector: 'a',
    activeClass: 'active',
    offset: 120
  });
}

// Google Map
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("googleMap"), {
    center: { lat: 40.6686, lng: -73.8999 },
    zoom: 13.5,
    mapId: '2f084b4895741534',
  });

  const marker = new google.maps.Marker({
    position: { lat: 40.6781, lng: -73.8981 },
    map: map,
    title: "Monticello",
    icon: {
      url: "https://i.postimg.cc/30jd33nS/Pin.png",
      scaledSize: new google.maps.Size(100, 100),
    },
  });
}

window.initMap = initMap;
