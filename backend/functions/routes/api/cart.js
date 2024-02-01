/* eslint-disable linebreak-style */
/* eslint-disable max-len */

const router = require("express").Router();
const admin = require("firebase-admin");

const cartController = require("../../controllers/cartController");

// TODO:
router.get("/", cartController.cartTestRouteServer);
router.get("/:cartId", cartController.getUserCartServer);
router.get("/all/:cartId", cartController.getAllCartItemsServer);

router.post("/create", cartController.createCartServer);
router.post("/add/:cartId", cartController.addToCartServer);

router.patch("/update/:cartId/:productId/:productIdentifier", cartController.changeCartItemQuantityServer);

router.put("clear/:cartId", cartController.clearCartItemsServer);

router.delete("/delete/:cartId/:productId/:productIdentifier", cartController.clearCartItemsServer);

module.exports = router;
