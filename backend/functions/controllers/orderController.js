/* eslint-disable linebreak-style */

const admin = require("firebase-admin");
const db = admin.firestore();

const orderTestRouteServer = (_req, res, next) => {
  return res.send("Inside the orders router");
};

/**
 * This will be where the order api endpoints will go
 * Update orders(status, details, etc)
 *  Get orders
 * Get all orders
 * Get order by id, users, etc
 */

module.exports = {
  orderTestRouteServer,
};
