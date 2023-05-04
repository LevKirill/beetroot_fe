/*
* Запитай у користувача його вік і визначи, ким він є: дитиною (0-11), підлітком (12-17),
* дорослим (18_59) або пенсіонером (60 ...), передбач можливість введення невірних даних.
*/
let age = document.getElementById('age'),
  btn1 = document.querySelector('.form1 button'),
  answer1 = document.querySelector('.answer1'),
  textAnswer1;

btn1.onclick = (evt) => {
  evt.preventDefault();
  answer1.classList.remove('error');

  if (age.value <= 11) {
    textAnswer1 = `Вам ${age.value} років, ви дитина.`;
  } else if (age.value >= 12 && age.value <= 17) {
    textAnswer1 = `Вам ${age.value} років, ви підліток.`;
  }
  if (age.value >= 18 && age.value <= 59) {
    textAnswer1 = `Вам ${age.value} років, ви доросла людина.`;
  } else if (age.value >= 60 && age.value <= 100) {
    textAnswer1 = `Вам ${age.value} років, ви пенсіонер.`;
  } else {
    answer1.classList.add('error');
    textAnswer1 = `Вік повинен бути від 0 до 100`;
  }

  answer1.textContent = textAnswer1;
  age.value = '';
}

/*
* Запитай у користувача число від 0 до 9 і виведи йому спецсимвол,
* який розташований на цій клавіші (1 !, 2 @, 3 # і т. д).
*/
let special = document.getElementById('special'),
  btn2 = document.querySelector('.form2 button'),
  answer2 = document.querySelector('.answer2'),
  textAnswer2,
  specialSymbol = [')', '!', '@', '#', '$', '%', '^', '&', '*', '('];

btn2.onclick = (evt) => {
  evt.preventDefault();
  answer2.classList.remove('error');
  if (special.value && special.value >= 0 && special.value < 10) {
    textAnswer2 = special.value + ' = ' + specialSymbol[special.value];
  } else {
    answer2.classList.add('error');
    textAnswer2 = 'Число повинно бути від 0 до 9';
  }
  answer2.textContent = textAnswer2;
  special.value = '';
}

/*
* Підрахуй суму всіх чисел в заданому користувачем діапазоні.
*/
let minNum = document.getElementById('minNum'),
  maxNum = document.getElementById('maxNum'),
  btn3 = document.querySelector('.form3 button'),
  answer3 = document.querySelector('.answer3'),
  x, y;

btn3.onclick = (evt) => {
  evt.preventDefault();
  let textAnswer3 = 0;
  answer3.classList.remove('error')

  if (minNum.value <= 100 && maxNum.value <= 100) {

    if (minNum.value <= maxNum.value) {
      x = minNum.value;
      y = maxNum.value;
    } else {
      x = maxNum.value;
      y = minNum.value;
    }

    while (x <= y) {
      textAnswer3 += +x;
      x++;
    }

    answer3.textContent = `Сума чисел діапазону дорівнює ${textAnswer3}`;
  } else {
    answer3.classList.add('error');
    answer3.textContent = 'Вибачте, числа повинни бути меньше, або дорівнювати 100';
  }
  maxNum.value = minNum.value = '';
}

/*
* Запитай у користувача 2 числа і знайди найбільший спільний дільник.
*/
let minNum1 = document.getElementById('minNum1'),
  maxNum1 = document.getElementById('maxNum1'),
  btn4 = document.querySelector('.form4 button'),
  answer4 = document.querySelector('.answer4');

// answer4.textContent = gcd(75, 30);

btn4.onclick = (evt) => {
  evt.preventDefault();
  let x = minNum1.value,
    y = maxNum1.value;

  function gcd(a, b) {
    if (b === 0) {
      return a;
    }
    return gcd(b, a % b);
  }

  answer4.textContent = `Найбільший спільний дільник у чисел ${x} і ${y} = ${gcd(x, y)}`;
  minNum1.value = '';
  maxNum1.value = '';
}

/*
* Запитай у користувача число і виведи всі дільники цього числа.
*/
let numDivider = document.getElementById('numberDivider'),
  btn5 = document.querySelector('.form5 button'),
  answer5 = document.querySelector('.answer5');

btn5.onclick = (evt) => {
  evt.preventDefault();
  let n = numDivider.value;
  const parts = [];

  for (let i = 2; i * 2 <= n; i++) {
    if (n % i == 0) {
      parts.push(i);
    }
  }

  const innerValue = parts.join(', ');
  const result = innerValue;

  answer5.textContent = `Дільники числа ${n} = ${result}`;
  numDivider.value = '';
}

