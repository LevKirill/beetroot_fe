const car = {
  manufacturer: 'Toyota',
  model: 'Corolla',
  year_issue: 2019,
  average_speed: 90, //середня швидкість
  gas_tank_volume: 55, //обсяг паливного баку
  fuel_consumption: 7.2, //середня витрата палива на 100 км
  drivers: {
    driver_1: 'Кирил',
    driver_2: 'Катерина'
  }
}


//Мінімум 1
function showCarModel() {
  return `Модель автомобіля ${car.manufacturer} ${car.model}`;
}

console.log(showCarModel());


//Мінімум 2
function addDriver(name) {
  let size = Object.keys(car.drivers).length + 1;
  car.drivers[`driver_${size}`] = name;
  return car.drivers;
}

console.log(addDriver('Єва'));
console.log(addDriver('Іван'));
console.log(addDriver('Антон'));


// Мінімум 3
function checkDriver(name) {
  let nameDriver;
  for (let key in car.drivers) {
    let driver = car.drivers[key];
    // console.log(driver);
    if (name === driver) {
      nameDriver = `Ім\'я "${name}" є у списку водіїв.`;
    }
  }
  if (!nameDriver) {
    nameDriver = `У списку водіїв немає імені "${name}".`;
  }
  return nameDriver;
}

console.log(checkDriver('Кирил'));
console.log(checkDriver('Катерина'));
console.log(checkDriver('Єва'));
console.log(checkDriver('Максим'));


// Мінімум 4
function calcTimeFuel(distance) {
  let time = Math.round(distance / car.average_speed),
    fuel = distance / 100 * car.fuel_consumption,
    restDriver;
  if (time >= 4) {
    restDriver = Math.floor(time / 4);
    time += restDriver;
  }
  return `Щоб проїхати відстань ${distance} км, водій буде у дорозі ${time} годин (з них ${restDriver} годин витратить на відпочинок) та витратить ${fuel.toFixed(1)} л палива.`
  return `${time} годин і ${fuel.toFixed(2)} л`;
}

console.log(calcTimeFuel(1273));

// Норма
let data = new Date();

let times = {
  hour: data.getHours(),
  minutes: data.getMinutes(),
  seconds: data.getSeconds()
}

function calcHour24(TimeHour) {
  for (let i = TimeHour; i >= 24; i -= 24) {
    if (TimeHour >= 24) {
      TimeHour -= 24;
    }
  }
  return TimeHour;
}

function calcTimeSeconds(addSeconds) {
  let hour = times.hour * 3600,
    minutes = times.minutes * 60,
    seconds = times.seconds;

  let sum = hour + minutes + seconds + addSeconds;
  hour = Math.floor(sum / 3600);
  minutes = Math.floor((sum - hour * 3600) / 60);
  seconds = Math.floor(sum - hour * 3600 - minutes * 60);
  hour = calcHour24(hour);

  return `Було - ${times.hour}:${times.minutes}:${times.seconds}. Якщо додати ${addSeconds} секунд, стане ${hour}:${minutes}:${seconds}`
}

function calcTimeMinutes(addMinutes) {
  let hour = times.hour * 60,
    minutes,
    sum = hour + times.minutes + addMinutes;

  hour = Math.floor(sum / 60);
  minutes = Math.floor(sum - hour * 60);
  hour = calcHour24(hour);

  return `Було - ${times.hour}:${times.minutes}:${times.seconds} Якщо додати ${addMinutes} хвилин, стане ${hour}:${minutes}:${times.seconds}`
}

function calcTimeHour(addHour) {
  let hour = times.hour + addHour;

  hour = calcHour24(hour);

  return `Було - ${times.hour}:${times.minutes}:${times.seconds} Якщо додати ${addHour} годин, стане ${hour}:${times.minutes}:${times.seconds}`
}

console.log(calcTimeSeconds(20000));
console.log(calcTimeMinutes(600));
console.log(calcTimeHour(45));


//Максимум
let sumFraction = {
  sum: function(a, b) {
    return `${a} + ${b} = ${(a + b).toFixed(2)}`;
  },
  diff: function(a, b) {
    return `${a} - ${b} = ${(a - b).toFixed(2)}`;
  },
  product: function (a, b) {
    return `${a} * ${b} = ${(a * b).toFixed(2)}`;
  },
  quotient: function (a, b) {
    return `${a} / ${b} = ${(a / b).toFixed(2)}`;
  },
  fraction_reduction: function (a) {
    return `${a} = ${Math.round(a)}`;
  }
}

console.log(sumFraction.sum(0.1, 0.2));
console.log(sumFraction.diff(0.47, 0.33));
console.log(sumFraction.product(3.56, 12.71));
console.log(sumFraction.quotient(1.82, 3.77));
console.log(sumFraction.fraction_reduction(5.71));
