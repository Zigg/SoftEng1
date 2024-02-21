const router = require("express").Router();

const reportController = require("../../controllers/reportController");
const checkoutReportController = require("../../controllers/reports/checkoutSessionReportController");
const orderReportController = require("../../controllers/reports/orderReportController");
router.get("/", reportController.reportTestRouteServer);
const revenueReportController = require("../../controllers/reports/revenueReportController");

router.get("/product/:productId", reportController.reportProductServer);
router.get("/product/all", reportController.reportProductAllServer);
router.get("/order/:orderId", reportController.reportOrderServer);
router.get("/order/all", reportController.reportOrderAllServer);
router.get("/user/:userId", reportController.reportUserServer);
router.get("/user/all", reportController.reportUserAllServer);

router.get("/gross-revenue", revenueReportController.grossRevenueReportServer);

router.get("/checkout-session-completed", checkoutReportController.completedCheckoutSessionReportServer);

router.get("/order-status", orderReportController.orderStatusReportServer);

module.exports = router;
