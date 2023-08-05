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
let btn = document.querySelectorAll('.sort th'),
  td = [],
  tdText = [],
  tdColumn = [];
  index = 1;

for (let i = 0; i < btn.length; i++) {
  td[i] = document.querySelectorAll(`.sort td:nth-child(${index})`);
  for (let j = 0; j < td[i].length; j++) {
    tdText[j] = td[i][j].innerText;
    tdColumn[i] = tdText.slice();
  }
  btn[i].addEventListener('click', function () { sort(tdColumn[i], td[i]); });
  index++;
}

// Function HW_2
function sort (tdAccepted, td) {
  let tdArray = [];
  for (let i = 0; i < tdAccepted.length; i++) {
    for (let j = 0; j < tdAccepted[i].length; j++) {
      tdArray[i] = tdAccepted[i];
    }
  }
  tdArray.sort(function(a, b){return a-b});
  for (let i = 0; i < tdArray.length; i++) {
    td[i].innerText = tdArray[i];
  }
}
