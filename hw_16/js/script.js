let btn = document.getElementsByClassName('hamburger');
let menu = document.getElementsByClassName('menu');

btn[0].onclick = function() {
    btn[0].classList.toggle('hamburger--active');
    menu[0].classList.toggle('menu--active');
}
