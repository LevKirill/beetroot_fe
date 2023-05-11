let listProduct = [],
  answer = {
    min1: [
      {productsName: 'Яблука', quantity: 7, purchase: true, price: 29, total: function() {return this.quantity * this.price}},
      {productsName: 'Персики', quantity: 14, purchase: true, price: 32, total: function() {return this.quantity * this.price}},
      {productsName: 'Манго', quantity: 4, purchase: false, price: 24, total: function() {return this.quantity * this.price}},
      {productsName: 'Апельсини', quantity: 7, purchase: true, price: 15, total: function() {return this.quantity * this.price}},
      {productsName: 'Ківі', quantity: 2, purchase: false, price: 13, total: function() {return this.quantity * this.price}},
      {productsName: 'Банани', quantity: 9, purchase: false, price: 10, total: function() {return this.quantity * this.price}},
      {productsName: 'Виноград', quantity: 3, purchase: true, price: 19, total: function() {return this.quantity * this.price}},
      {productsName: 'Кавун', quantity: 5, purchase: true, price: 14, total: function() {return this.quantity * this.price}},
      {productsName: 'Абрикоси', quantity: 12, purchase: false, price: 22, total: function() {return this.quantity * this.price}},
      {productsName: 'Абрикоси', quantity: 6, purchase: true, price: 27, total: function() {return this.quantity * this.price}},
    ],
    min1_1: function () {
      this.min1.forEach((element) => {
        if (element.purchase === true) {
          listProduct.push(element.productsName + ": придбані");
        } else if (element.purchase === false) {
          listProduct.unshift(element.productsName + ": непридбані");
        }
      });
      return listProduct;
    },
    min1_2: function (productName) {
      for (let i = 0; i < this.min1.length; i++) {
        if (this.min1[i].productsName === productName) {
          this.min1[i].purchase = true;
          return `Товар ${productName} купили.`;
        }
      }
      return `Товару ${productName} немає у списку.`;
    },
  };

console.log(answer.min1); /* Мінімум 1 */
console.log(answer.min1_1()); /* Мінімум 1.1 */
console.log(answer.min1_2('Манго')); /* Мінімум 1.2 */
