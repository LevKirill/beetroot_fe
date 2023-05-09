//Text copyright in footer
let date = new Date(),
  dateYear = date.getFullYear(),
  copyright = document.querySelector('.copyright');

copyright.textContent = `Copyrights © ${dateYear} Montichello`;

//Slider in section.main_screen
var swiper = new Swiper(".main_screen__slider", {
  direction: "vertical",
  spaceBetween: 30,
  centeredSlides: true,
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

// Плавна прокрутка до якоря
document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener('click', function (e) {
    // document.getElementById('hamburger').checked = false;

    e.preventDefault();

    let href = this.getAttribute('href').substring(1);

    const scrollTarget = document.getElementById(href);

    // const topOffset = document.querySelector('.main_header').offsetHeight;
    const topOffset = 0; // если не нужен отступ сверху
    const elementPosition = scrollTarget.getBoundingClientRect().top;
    const offsetPosition = elementPosition - topOffset;

    window.scrollBy({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});

let element = document.querySelector('.header');

window.addEventListener('scroll', function () {
    if (window.scrollY > 53) {
      element.classList.add("header__sticky");
    } else {
      element.classList.remove("header__sticky");
    }
  });
