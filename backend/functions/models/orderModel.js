/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable comma-dangle */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable space-before-function-paren */
/* eslint-disable eol-last */

// TODO: This is not yet final
const Joi = require("joi");

// Define a schema for the Order class using Joi
const orderSchema = Joi.object({
  id: Joi.string().required(),
  userId: Joi.string().required(),
  orderDate: Joi.string().required(),
  status: Joi.string().valid("pending", "confirmed", "shipped", "delivered", "cancelled").required(),
  customerName: Joi.string(),
  customerEmail: Joi.string().email().required(),
  shippingAddress: Joi.array().items(Joi.object({
    address: Joi.string().required(),
    city: Joi.string().required(),
    province: Joi.string().required(),
  })).optional(),
  // TODO: These should be derived from the cart schema
  cartId: Joi.string().required(),
  totalPrice: Joi.number().required(),
});

// TODO: Pass the response for validation
const data = {};
const { error, value } = orderSchema.validate(data);

// TODO: Handle the validation result
if (error) {
  console.error("Validation error:", error.message);
} else {
  console.log("Validation success:", value);
}

module.exports = orderSchema;