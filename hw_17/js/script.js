let sidebar = document.getElementsByClassName('sidebar');
let btnSidebar = document.getElementsByClassName('sidebar__btn');
let layoutGrid = document.getElementsByClassName('layout');

btnSidebar[0].onclick = function() {
  layoutGrid[0].classList.toggle('layout__active');
  sidebar[0].classList.toggle('sidebar__active');
}