const router = require("express").Router();

const checkoutReportController = require("../../controllers/reports/checkoutSessionReportController");
const orderReportController = require("../../controllers/reports/orderReportController");
const revenueReportController = require("../../controllers/reports/revenueReportController");

router.get("/gross-revenue", revenueReportController.grossRevenueReportServer);

router.get("/checkout-session-completed", checkoutReportController.completedCheckoutSessionReportServer);

router.get("/order-status", orderReportController.orderStatusReportServer);

module.exports = router;
