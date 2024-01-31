/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable space-before-function-paren */
/* eslint-disable eol-last */

// TODO: This is not yet final
const Joi = require("joi");

// Define a schema for the Cart class using Joi
const cartSchema = Joi.object({
  id: Joi.number().required(),
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
const { error, value } = cartSchema.validate(data);

// TODO: Handle the validation result
if (error) {
  console.error("Validation error:", error.message);
} else {
  console.log("Validation success:", value);
}

module.exports = cartSchema;