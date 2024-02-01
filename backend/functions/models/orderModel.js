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

const orderStatus = [
  "pending", "confirmed", "shipped", "delivered", "cancelled"
];

// Define a schema for the Order class using Joi
const orderSchema = Joi.object({
  id: Joi.string(),
  userId: Joi.string().required(),
  orderDate: Joi.string().required(),
  // NOTE: firestore doesn't have native support for enums so it needs to be enforced on the application level
  status: Joi.string().valid(...orderStatus).required(),
  customerName: Joi.string(),
  customerEmail: Joi.string().email().required(),
  shippingAddress: Joi.array().items(Joi.object({
    address: Joi.string().required(),
    city: Joi.string().required(),
    province: Joi.string().required(),
  })).optional(),
  // TODO: This should be derived from the cart schema
  items: Joi.array().items(Joi.object({
    productId: Joi.string().required(),
    // This will be derived from the chosen addons,sizes,etc different from the productId
    // Example: "large_cheese" derived from size and possible addons to help distinguish it from the same items from the cart if any
    productIdentifier: Joi.string().required(),
    productQuantity: Joi.number().required(),
    productPrice: Joi.number().required(),
  })).optional(),
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