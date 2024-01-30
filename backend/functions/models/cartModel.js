/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable space-before-function-paren */
/* eslint-disable eol-last */

// TODO: This is not yet final
class Cart {
  constructor(id, item, quantity, price) {
    this.id = id;
    this.item = item;
    this.quantity = quantity;
    this.price = price;
  }
}


module.exports = {
  Cart,
};