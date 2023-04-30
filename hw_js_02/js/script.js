// Мінімум 01. Виконай додавання 0,1 і 0,2 добийся математично правильної відповіді.
let rounded = function (number) {
    return +number.toFixed(1);
  },
  min1 = document.querySelector('.min1'),
  a = 0.1,
  b = 0.2;

min1.onclick = function () {
  min1.textContent = rounded(a + b);
}

/*
* Мінімум 02.
* Виконай додавання рядка "1" і цифри 2 (обидві операнди повинні бути в змінних),
* добийся математично правильної відповіді.
* */
let c = '1',
  d = 2,
  min2 = document.querySelector('.min2');

min2.onclick = function () {
  min2.textContent = rounded(Number(c) + Number(d));
}

/*
* Мінімум 03.
* Користувач вказує обсяг флешки в Гб.
* Програма повинна порахувати скільки файлів розміром в 820 Мб поміщається на флешку.
* */
let sizeFile = 820,
  enterAmountMemory = document.querySelector('#AmountMemory'),
  btnMemory = document.querySelector('.form_min_1 button'),
  min1Answer = document.querySelector('.min1Answer');

btnMemory.onclick = function (evt) {
  evt.preventDefault();

  if (enterAmountMemory.value) {
    min1Answer.classList.remove('error');
    let enterAmountMemoryMb = enterAmountMemory.value * 1024,
      numberFiles = Math.floor(enterAmountMemoryMb / 820);
    min1Answer.textContent =
      `На флешку, об'ємом ${enterAmountMemory.value}Гб, поміститься файлів, розміром 820Мб - ${numberFiles} шт`;
  } else {
    min1Answer.classList.add('error');
    min1Answer.textContent = "Введіть значення";
  }

  enterAmountMemory.value = '';
}

/*
* Норма 01.
* Користувач вводить суму грошей в гаманці і ціну однієї шоколадки.
* Програма виводить скільки шоколадок може купити користувач і скільки здачі у нього залишиться.
*/
let enterAmountMoney = document.querySelector('#amountMoney'),
  enterCostChocolate = document.querySelector('#costChocolate'),
  btnSum = document.querySelector('.form_norm_1 button'),
  norm1Answer = document.querySelector('.norm1Answer');

btnSum.onclick = function (evt) {
  evt.preventDefault();

  if (enterAmountMoney.value && enterCostChocolate.value) {
    norm1Answer.classList.remove('error');
    let numberChocolate = enterAmountMoney.value / enterCostChocolate.value,
      remainderMoney = enterAmountMoney.value % enterCostChocolate.value;
    norm1Answer.textContent =
      `На ${enterAmountMoney.value} монет ви можете купити ${Math.floor(numberChocolate)} шт. шоколаду за ціною ${enterCostChocolate.value} монет/шт, здача складе ${remainderMoney} монети.`;
  } else {
    norm1Answer.classList.add('error');
    norm1Answer.textContent = "Введіть всі значення";
  }

  enterAmountMoney.value = '';
  enterCostChocolate.value = '';
}

/*
* Норма 01.
* Запитай у користувача тризначне число і виведи його задом наперед.
* Для вирішення завдання тобі знадобиться оператор % (залишок від ділення).
* */
let EnterNumber = document.querySelector('#threeDigitNumber'),
  btnNorm2Answer = document.querySelector('.form_norm_2 button'),
  textNorm2Answer = document.querySelector('.norm2Answer');

btnNorm2Answer.onclick = function (evt) {
  evt.preventDefault();
  let answerNorm2;

  if (EnterNumber.value >= 100 && EnterNumber.value < 1000) {
    let a, b, c;

    textNorm2Answer.classList.remove('error');

    a = EnterNumber.value % 10;
    b = ((EnterNumber.value - a) / 10) % 10;
    answerNorm2 = EnterNumber.value + ' = ' + String(a) + String(b) + ((EnterNumber.value - (String(b) + a)) / 100);
  } else {
    textNorm2Answer.classList.add('error');
    answerNorm2 = 'Будь ласка, введіть число від 100 до 999';
  }


  textNorm2Answer.textContent = answerNorm2;

  EnterNumber.value = '';
}

/*
* Максимум 01
* Користувач вводить суму вкладу в банк на 2 місяці, з процентною ставкою депозиту 5% річних.
* Вивести суму нарахованих відсотків.
*/

let enterAmountContribution = document.querySelector('#amountContribution'),
  btnMaxAnswer1 = document.querySelector('.form_max_1 button'),
  textMax1Answer = document.querySelector('.max1Answer'),
  interestRate = 5,
  interestRateMonth = 2;

btnMaxAnswer1.onclick = function (evt) {
  evt.preventDefault();

  let percent = enterAmountContribution.value * (interestRate / 12 * interestRateMonth / 100);

  if (enterAmountContribution.value) {
    textMax1Answer.classList.remove('error');
    textMax1Answer.textContent = `Від суми ${enterAmountContribution.value} зі ставкою ${interestRate}% річних 
      за ${interestRateMonth} місяця складе ${rounded(percent)}`;
  } else {
    textMax1Answer.classList.add('error');
    textMax1Answer.textContent = "Введіть значення";
  }


  enterAmountContribution.value = '';
}

/*
* Максимум 02
* Що повернуть вирази:
* 2 && 0 && 3
* 2 || 0 || 3
* 2 && 0 || 3
*/

let max2Answer1 = document.querySelector('.max2Answer1'),
  max2Answer2 = document.querySelector('.max2Answer2'),
  max2Answer3 = document.querySelector('.max2Answer3'),
  max2Question1 = 2 && 0 && 3,
  max2Question2 = 2 || 0 || 3,
  max2Question3 = 2 && 0 || 3;

max2Answer1.onclick = function () {
  max2Answer1.textContent = (max2Question1) ? 'true' : 'false';
}

max2Answer2.onclick = function () {
  max2Answer2.textContent = (max2Question2) ? 'true' : 'false';
}

max2Answer3.onclick = function () {
  max2Answer3.textContent = (max2Question3) ? 'true' : 'false';
}
