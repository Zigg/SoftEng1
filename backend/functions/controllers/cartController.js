/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */


const admin = require("firebase-admin");
const db = admin.firestore();
const cartRef = db.collection("cart");
const { cartSchema } = require("../models/cartModel");

const cartTestRouteServer = (_req, res, next) => {
  return res.send("Inside the cart router");
};

// TODO: Store all these instances to Redux(if applicable)

const addToCartServer = async (req, res, next) => {
  // TODO: Assign the cart to a user
  const userId = req.params.userId;
  // TODO:
  const productId = req.body.productId;

  try {
    console.log(userId);
    console.log(productId);
    if (!userId) {
      return res.status(401).send({ success: false, msg: `ADD TO CART [SERVER] Unauthorized` });
    }
    return res.status(200).send({ success: true, msg: "ADD CARD SUCCESSFUL [SERVER]" });
  } catch (error) {
    return res.status(500).send({ success: false, msg: `ADD CART ERROR [SERVER] ${error.message}` });
  }
};

// TODO: Update Cart based on cart logic
// --Increment & Decrement Items
// --Same items but different options are separated, product identifier will be created based on the selected options
// --Adding a product to the cart whilst there already is an instance of the items will add x quantity from the current items selected
const changeCartItemQuantityServer = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    console.log(userId);
    if (!userId) {
      return res.status(401).send({ success: false, msg: `Unauthorized` });
    }
    return res.status(200).send({ success: true });
  } catch (error) {
    return res.status(500).send({ success: false, msg: `UPDATE CART ERROR [SERVER] ${error.message}` });
  }
};

// TODO: Fetch currents user's cart items
const getAllCartItemsServer = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    console.log(userId);
    if (!userId) {
      return res.status(401).send({ success: false, msg: `Unauthorized` });
    }
    return res.status(200).send({ success: true });
  } catch (error) {
    return res.status(500).send({ success: false, msg: `GET ALL CART ITEMS ERROR [SERVER] ${error.message}` });
  }
};

// TODO: Clear cart once a checkout session is made a completed successfully, maybe send these items to previously bought items

const clearCartItemsServer = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    console.log(userId);

    return res.status(200).send({ success: true, message: "All cart items cleared successfully" });
  } catch (error) {
    return res.status(500).send({ success: false, message: `ERROR CLEAR CART ITEMS [SERVER]: ${error.message}` });
  }
};


module.exports = {
  cartTestRouteServer, addToCartServer, changeCartItemQuantityServer, getAllCartItemsServer, clearCartItemsServer,
};
