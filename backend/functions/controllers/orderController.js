/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */

const admin = require("firebase-admin");
const db = admin.firestore();
const orderRef = ("orders");

// TODO: Add Joi for validation

const orderTestRouteServer = (_req, res, next) => {
  return res.send("Inside the orders router");
};

// TODO:
const getAllOrdersServer = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    console.log(userId);
  } catch (error) {
    // Handle error
  }
};

// TODO:
const createOrderServer = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const { orderName, cartId } = req.body;

    const newOrder = await db.collection("orders").add({
      orderName,
      cartId,
      userId,
      status: "pending",
    });

    return res.status(200).send(newOrder);
  } catch (error) {
    // Handle error
  }
};

// TODO:
const updateOrderStatusServer = async (req, res) => {
  const orderId = req.params.orderId;
  const { status } = req.body;

  try {
    await db.collection("orders").doc(`/${orderId}/`).update({ status });

    return res.status(200).send({ success: true, msg: "Order status updated successfully" });
  } catch (error) {
    return res.send({
      success: false,
      msg: `USER UPDATE ORDER ERROR [SERVER] ${error.message}`,
    });
  }
};


/**
 * This will be where the order api endpoints will go
 * Update orders(status, details, etc)
 *  Get orders
 * Get all orders
 * Get order by id, users, etc
 */

module.exports = {
  orderTestRouteServer, getAllOrdersServer, createOrderServer, updateOrderStatusServer,
};
