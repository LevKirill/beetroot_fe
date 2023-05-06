/*
* Створи функцію, яка буде виводити кількість переданих їй аргументів.
*/

function getNumArg () {
  let num = 0;
  for (let i = 0; i < arguments.length; i++) {
    num++;
  }
  console.log(num);
}

getNumArg(1, 2, 'Home', 2345, 'World');

/*
* Напиши функцію, яка приймає 2 числа і повертає:
* -1, якщо перше число менше, ніж друге;
* 1 - якщо перше число більше, ніж друге;
* 0 - якщо числа рівні.
*/

function getComparison (num1, num2) {
  if (num1 < num2) {
    return -1;
  } else if (num1 > num2) {
    return 1;
  } else {
    return 0;
  }
}

console.log(getComparison(1, 2));
console.log(getComparison(2, 1));
console.log(getComparison(2, 2));

/*
* Напиши функцію, яка обчислює факторіал переданого їй числа
*/
function getFactorial(num) {
  let result = 1;
  while (num) {
    result *= num--;
  }
  return result;
}

console.log(getFactorial(5));

/*
* Напиши функцію, яка приймає три окремі цифри і перетворює їх в одне число.
* Наприклад: цифри 1, 4, 9 перетворяться в число 149.
*/
function getSum (num1, num2, num3) {
  let sum = num1 + String(num2) + num3;
  return sum;
}

console.log(getSum(1,2,3));

/*
* Напиши функцію, яка приймає довжину і ширину прямокутника і обчислює його площу.
* Якщо в функцію передали 1 параметр, то вона обчислює площу квадрата.
*/
function getSquare (width, height) {
  let square;
  if (height) {
    square = width * height;
  }
  else {
    square = width * width;
  }
  return square;
}

console.log(getSquare(2));
console.log(getSquare(2, 3));
