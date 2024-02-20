const router = require("express").Router();
require("dotenv").config();
const checkoutController = require("../../controllers/checkoutController");

router.get("/", checkoutController.checkoutTestRouteServer);
router.get("/:sessionId", checkoutController.getCheckoutSessionByIdServer);
router.get("/:sessionId/line_items", checkoutController.getSessionLineItemsServer);

router.post("/create-checkout-session", checkoutController.createCheckoutSessionServer);

// NOTE: Not a webhook
router.post("/checkout-intent", checkoutController.createCheckoutIntentServer);
router.post("/create-checkout-status", checkoutController.createCheckoutStatusServer);
router.post("/webhook", checkoutController.webhookEventHandler);

module.exports = router;
