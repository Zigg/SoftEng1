// TODO: This is not yet final
const Joi = require("joi");

const orderStatus = [
  "pending", "confirmed", "shipped", "delivered", "cancelled",
];

// Define a schema for the Order class using Joi
const orderSchema = Joi.object({
  orderId: Joi.string(),
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
  // TODO: This will include the list of items from within the product id we will need to map over this
  cartId: Joi.string(),
  totalPrice: Joi.number().required(),
});

module.exports = orderSchema;
