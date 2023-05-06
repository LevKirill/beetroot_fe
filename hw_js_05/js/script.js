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
function showCarModel () {
  return `Модель автомобіля ${car.manufacturer} ${car.model}`;
}

console.log(showCarModel());


//Мінімум 2
function addDriver (name) {
  let size = Object.keys(car.drivers).length + 1;
  car.drivers[`driver_${size}`] = name;
  return car.drivers;
}

console.log(addDriver('Єва'));
console.log(addDriver('Іван'));
console.log(addDriver('Антон'));


// Мінімум 3
function checkDriver (name) {
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
function calcTimeFuel (distance) {
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