/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable space-before-function-paren */
/* eslint-disable eol-last */

// TODO: This is not yet final
class Order {
  constructor(id, status, price, customerName, shippingAddress) {
    this.id = id;
    this.status = status;
    this.price = price;
    this.customerName = customerName;
    // this.shippingAddress = shippingAddress;
  }
}

module.exports = Order;