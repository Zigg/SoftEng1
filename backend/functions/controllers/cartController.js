/* eslint-disable linebreak-style */
/* eslint-disable block-spacing */
/* eslint-disable semi */
/* eslint-disable brace-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */

const admin = require("firebase-admin");
const db = admin.firestore();
const cartCollectionRef = db.collection("cart");
const { cartSchema, createCartSchema } = require("../models/cartModel");
const productsCollectionRef = db.collection("products");
const { checkProductExists } = require("../helpers/checkProductExists");

const cartTestRouteServer = (_req, res, next) => {
  return res.send("Inside the cart router");
};

// TODO: Store all these instances to Redux(if applicable)

// TODO:
// TODO: Verify products existence,
// TODO: Calculate the total price of the items in the cart

const calculateTotalPrice = (items) => {
  let totalPrice = 0;
  items.forEach((item) => {
    const { productPrice, productQuantity } = item;
    if (typeof productPrice === "number" && typeof productQuantity === "number") {
      totalPrice += productPrice * productQuantity;
    }
  });
  return Number(totalPrice.toFixed(2));
};

const addToCartServer = async (req, res) => {
  // REVIEW:
  // TODO: Fetch the price based on the products chosen options, or just calculate the price based on the base price of the product, and create a product identifier based on the chosen options
  const id = req.params.cartId;
  try {
    const cartDoc = await cartCollectionRef.doc(id).get();
    if (!cartDoc.exists) {
      return res.status(404).send({ success: false, msg: `CART NOT FOUND [SERVER]` });
    }
    if (!id || typeof id !== "string") {
      return res.status(400).send({ success: false, msg: "Invalid ID parameter" });
    }

    if (!req.body || !req.body.items || !Array.isArray(req.body.items) || req.body.items.length === 0) {
      return res.status(400).send({ success: false, msg: "CART ADD CANNOT ADD EMPTY REQUEST [SERVER]" });
    }
    const productIds = req.body.items.map((item) => { return item.productId });

    const productExists = await Promise.all(productIds.map(checkProductExists));
    if (productExists.includes(false)) {
      return res.status(400).send({ success: false, msg: "PRODUCT DOES NOT EXIST [SERVER]" });
    }

    // TODO: Create a product identifier based on the chosen options
    const productDoc = await productsCollectionRef.doc(req.body.items[0].productId).get();
    // NOTE: I want the index to be mapped based on the options that the user has chosen, and then create a product identifier based on the chosen options, and then check if the product identifier already exists in the cart, if it does then just increment the quantity of the product based on the given quantity (frontend)
    console.log(productDoc.data().addons[1].name);
    console.log(productDoc.data().sizes[0].name);

    const { userId, items: existingItems } = cartDoc.data();

    const newItems = (req.body.items || []).map((item) => {
      return {
        productId: item.productId,
        productIdentifier: item.productIdentifier,
        productQuantity: item.productQuantity,
        productPrice: item.productPrice,
      };
    });

    const updatedItems = [...existingItems, ...newItems];
    const totalPrice = parseFloat(calculateTotalPrice(updatedItems));

    req.body.totalPrice = totalPrice;

    // FIXME: This should be an array of objects
    // FIXME: Validate the items array
    const { error, value } = cartSchema.validate({ ...req.body, userId: userId, items: updatedItems, totalPrice: totalPrice, cartId: id });
    if (error) {
      console.error(`VALIDATION ERROR: ${error.message}`);
      return res.status(400).send({ success: false, msg: `VALIDATION ERROR: ${error.message}` });
    } else {
      const cart = {
        ...value,
      };

      cartCollectionRef.doc(id).update(cart).then(() => {
        return res.status(200).send({ success: true, data: cart });
      }).catch((error) => {
        console.error("Error updating document: ", error);
        return res.status(400).send({ success: false, msg: `ADD TO CART ERROR [SERVER] ${error.message}` });
      });
    }
  } catch (error) {
    return res.status(400).send({ success: false, msg: `ADD TO CART ERROR [SERVER] ${error.message}` });
  }
};

// TODO: Update Cart based on cart logic
// --Increment & Decrement Items
// --Same items but different options are separated, product identifier will be created based on the selected options
// --Adding a product to the cart whilst there already is an instance of the items will add x quantity from the current items selected
// TODO:
// FIXME: This is not yet implemented
const changeCartItemQuantityServer = async (req, res, next) => {
  try {
    const id = req.params.cartId;
    if (!id || typeof id !== "string") {
      return res.status(400).send({ success: false, msg: "Invalid ID parameter" });
    }
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
        return res.status(400).send({ success: false, msg: `CHANGE CART ITEM QUANTITY ERROR [SERVER] ${error.message}` });
      });
    }
  } catch (error) {
    return res.status(400).send({ success: false, msg: `CHANGE CART ITEM QUANTITY ERROR [SERVER] ${error.message}` });
  }
};

// TODO: Clear cart once a checkout session is made a completed successfully, maybe send these items to previously bought items
// TODO:
// FIXME: This is not yet implemented
// REVIEW:
const clearCartItemsServer = async (req, res, next) => {
  try {
    const id = req.params.cartId;
    if (!id || typeof id !== "string") {
      return res.status(400).send({ success: false, msg: "Invalid ID parameter" });
    }
    const doc = await cartCollectionRef.doc(id).get();

    if (!doc.exists) {
      return res.status(404).send({ success: false, msg: `CART NOT FOUND [SERVER]` });
    } else {
      const getUserCartResponse = await getUserCartServer(req, res, next);

      if (!getUserCartResponse.success) {
        return res.status(400).send({ success: false, msg: getUserCartResponse.msg });
      }

      // Clear the items within the cart
      const cart = {
        ...getUserCartResponse.data,
        // REVIEW:
        items: [{}],
      };
      console.log(cart);

      await cartCollectionRef.doc(id).update(cart);
      return res.status(200).send({ success: true, msg: "Cart items cleared successfully" });
    }
  } catch (error) {
    console.error(`CLEAR CART ITEMS ERROR [SERVER] ${error.message}`);
    return res.status(400).send({ success: false, msg: `CLEAR CART ITEMS ERROR [SERVER] ${error.message}` });
  }
};

// REVIEW:
// TODO: Add middleware to check for the owner of the cart
// TODO: This works but change it to fetch cart id instead
const getUserCartServer = async (req, res, next) => {
  try {
    const id = req.params.cartId;
    if (!id || typeof id !== "string") {
      return res.status(400).send({ success: false, msg: "Invalid ID parameter" });
    }

    const doc = await cartCollectionRef.doc(id).get();
    if (!doc.exists) {
      return res.status(404).send({ success: false, msg: "CART NOT FOUND [SERVER]" });
    }

    const { userId, items } = doc.data();
    const totalPrice = calculateTotalPrice(items);

    req.body.totalPrice = parseFloat(totalPrice);
    const { error, value } = cartSchema.validate({ items, userId, totalPrice });
    console.log(value)
    if (error) {
      console.error(`VALIDATION ERROR: ${error.message}`);
      return res.status(400).send({ success: false, msg: `VALIDATION ERROR: ${error.message}` });
    }

    const response = {
      cartId: doc.id,
      ...value,
    };

    return res.status(200).send({ success: true, data: response });
  } catch (error) {
    console.error(`GET USER CART BY ID ERROR [SERVER] ${error.message}`);
    return res.status(400).send({ success: false, msg: `GET USER CART BY ID ERROR [SERVER] ${error.message}` });
  }
};

// REVIEW:
// TODO: The items nested document must be an array of objects with the following properties: productId, productIdentifier, productQuantity, productPrice, and must be made upon invoking the create cart api endpoint
// NOTE: This can actually just be a helper function and can be invoked upon creation of an account, but for now just leave it here
const createCartServer = async (req, res, next) => {
  // REVIEW: This is finally getting the uuid from firebase authentication, however further testing is needed to check whether it is working properly
  try {
    const user = await admin.auth().getUser(req.params.userId);
    console.log(user.uid);
    const userId = user.uid;
    req.params.userId = userId;

    if (!userId) {
      return res.status(400).send({ success: false, msg: "User UUID not found" });
    }
    if (!userId || typeof userId !== "string") {
      return res.status(400).send({ success: false, msg: "Invalid ID parameter" });
    }

    // NOTE: Initialize the empty array of objects
    const items = [{}];
    const { error, value } = createCartSchema.validate({ ...req.body, userId: userId, items: items });

    if (error) {
      console.error(`VALIDATION ERROR: ${error.message}`);
      return res.status(400).send({ success: false, msg: `VALIDATION ERROR: ${error.message}` });
    }

    // TODO: Check if user already has a cart document assigned
    const userCartRef = await cartCollectionRef.where("userId", "==", userId).limit(1).get();
    if (!userCartRef.empty) {
      const cartId = userCartRef.docs[0].id;
      return res.status(200).send({ success: true, msg: "User already has a cart", cartId: cartId });
    }

    const createCart = {
      // userId: id,
      // items,
      ...value,
    };

    const cartRef = await cartCollectionRef.add(createCart);
    return res.status(200).send({ success: true, msg: "Cart created successfully", data: createCart, cartId: cartRef.id });
  } catch (error) {
    return res.status(400).send({ success: false, msg: `ERROR CREATE CART [SERVER]: ${error.message}` });
  }
};

// TODO:
// FIXME: This is not yet implemented
// REVIEW:
const deleteCartItemServer = async (req, res, next) => {
  try {
    const cartId = req.params.cartId;
    const productId = req.params.productId;
    const productIdentifier = req.params.productIdentifier;

    if (!cartId || typeof cartId !== "string" || !productId || typeof productId !== "string" || !productIdentifier || typeof productIdentifier !== "string") {
      return res.status(400).send({ success: false, msg: "Invalid ID parameter" });
    }
    // TODO: Check if the item exists in the cart
    // TODO: Check for nested items in the cart, etc
    const doc = await cartCollectionRef.doc(id).get();

    if (!doc.exists) {
      return res.status(404).send({ success: false, msg: `CART NOT FOUND [SERVER]` });
    } else {
      const { userId, items } = doc.data();
      const response = {
        cartId: doc.id,
        userId,
        items,
      };
      return res.status(200).send({ success: true, data: response });
    }
  } catch (error) {
    console.error(`DELETE CART ITEM ERROR [SERVER] ${error.message}`);
    return res.status(400).send({ success: false, msg: `DELETE CART ITEM ERROR [SERVER] ${error.message}` });
  }
};

module.exports = {
  cartTestRouteServer, addToCartServer, changeCartItemQuantityServer, clearCartItemsServer, getUserCartServer, createCartServer, deleteCartItemServer,
};
