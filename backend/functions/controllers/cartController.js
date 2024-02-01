/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */


const admin = require("firebase-admin");
const db = admin.firestore();
const cartCollectionRef = db.collection("cart");
const { cartSchema } = require("../models/cartModel");

const cartTestRouteServer = (_req, res, next) => {
  return res.send("Inside the cart router");
};

// TODO: Store all these instances to Redux(if applicable)

// TODO:
const addToCartServer = async (req, res, next) => {
  const id = req.params.cartId;
  try {
    console.log(id);
    const { error, value } = cartSchema.validate(req.body);

    if (error) {
      return res.status(400).send({ success: false, msg: `VALIDATION ERROR: ${error.message}` });
    } else {
      const cart = {
        ...value,
      };

      cartCollectionRef.add(cart).then((docRef) => {
        return res.status(200).send({ success: true, data: cart, id: docRef.id });
      }).catch((error) => {
        console.error("Error adding document: ", error);
        return res.status(500).send({ success: false, msg: `ADD TO CART ERROR [SERVER] ${error.message}` });
      });
    }
  } catch (error) {
    return res.status(500).send({ success: false, msg: `ADD TO CART ERROR [SERVER] ${error.message}` });
  }
};

// TODO: Update Cart based on cart logic
// --Increment & Decrement Items
// --Same items but different options are separated, product identifier will be created based on the selected options
// --Adding a product to the cart whilst there already is an instance of the items will add x quantity from the current items selected
// TODO:
const changeCartItemQuantityServer = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    console.log(userId);
    const { error, value } = cartSchema.validate(req.body);

    if (error) {
      return res.status(400).send({ success: false, msg: `VALIDATION ERROR: ${error.message}` });
    } else {
      const cart = {
        ...value,
      };

      cartCollectionRef.add(cart).then((docRef) => {
        return res.status(200).send({ success: true, data: cart, id: docRef.id });
      }).catch((error) => {
        console.error("Error adding document: ", error);
        return res.status(500).send({ success: false, msg: `CHANGE CART ITEM QUANTITY ERROR [SERVER] ${error.message}` });
      });
    }
  } catch (error) {
    return res.status(500).send({ success: false, msg: `CHANGE CART ITEM QUANTITY ERROR [SERVER] ${error.message}` });
  }
};

// TODO: Fetch currents user's cart items
// TODO:

const getAllCartItemsServer = async (req, res, next) => {
  const id = req.params.cartId;
  try {
    console.log(id);

    return res.status(200).send({ success: true, message: "Cart items fetched successfully" });
  } catch (error) {
    return res.status(500).send({ success: false, message: `ERROR GET ALL CART ITEMS [SERVER]: ${error.message}` });
  }
};

// TODO: Clear cart once a checkout session is made a completed successfully, maybe send these items to previously bought items
// TODO:
const clearCartItemsServer = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    console.log(userId);

    return res.status(200).send({ success: true, message: "Cart cleared successfully" });
  } catch (error) {
    return res.status(500).send({ success: false, message: `ERROR CLEAR CART ITEMS [SERVER]: ${error.message}` });
  }
};

// TODO:

const getUserCartServer = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    console.log(userId);

    return res.status(200).send({ success: true, message: "Cart instance fetched Successfully" });
  } catch (error) {
    return res.status(500).send({ success: false, message: `ERROR GET USER CART [SERVER]: ${error.message}` });
  }
};

// TODO:
// This can actually just be a helper function and can be invoked upon creation of an account, but for now just leave it here
const createCartServer = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    console.log(userId);

    return res.status(200).send({ success: true, message: "Cart created successfully" });
  } catch (error) {
    return res.status(500).send({ success: false, message: `ERROR CREATE CART [SERVER]: ${error.message}` });
  }
};

module.exports = {
  cartTestRouteServer, addToCartServer, changeCartItemQuantityServer, getAllCartItemsServer, clearCartItemsServer, getUserCartServer, createCartServer,
};
