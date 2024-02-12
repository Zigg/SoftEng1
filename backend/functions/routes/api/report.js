const router = require("express").Router();

const reportController = require("../../controllers/reportController");

router.get("/", reportController.reportTestRouteServer);

router.get("/product/:productId", reportController.reportProductServer);
router.get("/product/all", reportController.reportProductAllServer);
router.get("/order/:orderId", reportController.reportOrderServer);
router.get("/order/all", reportController.reportOrderAllServer);
router.get("/user/:userId", reportController.reportUserServer);
router.get("/user/all", reportController.reportUserAllServer);

module.exports = router;
