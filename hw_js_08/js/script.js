//HW_1
let area = null;
let view = document.querySelector('.hw_1 .content');

document.addEventListener("keydown", function(event) {
  if (event.ctrlKey && event.code === "KeyE") {
    event.preventDefault();
    editStart();
  }
});

function editStart() {
  area = document.createElement('textarea');
  area.className = 'content edit';
  area.value = view.innerHTML;

  area.onkeydown = function(event) {
    if (event.ctrlKey && event.code === "KeyS") {
      event.preventDefault();
      this.blur();
    }
  };

  area.onblur = function() {
    editEnd();
  };

  view.replaceWith(area);
  area.focus();
}

function editEnd() {
  view.innerHTML = area.value;
  area.replaceWith(view);
}

// HW_2
let btn = document.querySelectorAll('.hw_2 th'),
  td1 = document.querySelectorAll('.hw_2 td:nth-child(1)'),
  td2 = document.querySelectorAll('.hw_2 td:nth-child(2)'),
  td3 = document.querySelectorAll('.hw_2 td:nth-child(3)');

btn[0].addEventListener('click', function () { sort(td1); });
btn[1].addEventListener('click', function () { sort(td2); });
btn[2].addEventListener('click', function () { sort(td3); });

// Function HW_2
function sort (tdAccepted) {
  let tdArray = [];
  for (let i = 0; i < tdAccepted.length; i++) {
    tdArray[i] = tdAccepted[i].innerText;
  }
  tdArray.sort(function(a, b){return a-b});
  for (let i = 0; i < tdArray.length; i++) {
    tdAccepted[i].textContent = tdArray[i];
  }
}
