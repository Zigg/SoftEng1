/* eslint-disable linebreak-style */
/* eslint-disable max-len */


const admin = require("firebase-admin");
const db = admin.firestore();

const cartTestRouteServer = (req, res, next) => {
  return res.send("Inside the cart router");
};

// TODO: Store all these instances to Redux

// TODO: Create cart instance
// NOTE: Only initialized for the frontend using Redux

// TODO: Update Cart based on cart logic
// --Increment & Decrease Items
// --Same items but different options are separated, product identifier will be created based on the selected options
// --Adding a product to the cart whilst there already is an instance of the items will add x quantity from the current items selected

// TODO: Fetch currents users cart items


module.exports = {
  cartTestRouteServer,
};
