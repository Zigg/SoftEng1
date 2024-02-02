/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable new-cap */

const router = require("express").Router();
const cartController = require("../../controllers/cartController");

router.get("/", cartController.cartTestRouteServer);
router.get("/:cartId", cartController.getUserCartServer);

router.post("/create/:userId", cartController.createCartServer);
router.post("/add/:cartId", cartController.addToCartServer);

router.patch("/update/:cartId/:productId/:productIdentifier", cartController.changeCartItemQuantityServer);
// TODO: This will be invoked upon changing product options, i.e change size, addons, etc.
// router.patch("/update/:cartId/:productId/:productIdentifier", cartController.changeCartItemServer);

router.put("clear/:cartId", cartController.clearCartItemsServer);

router.delete("/delete/:cartId/:productId/:productIdentifier", cartController.deleteCartItemServer);

module.exports = router;
