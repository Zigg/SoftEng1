const router = require("express").Router();
const orderController = require("../../controllers/orderController");

router.get("/", orderController.orderTestRouteServer);
router.get("/all", orderController.getAllOrdersServer);
router.get("/:orderId", orderController.getOrderByIdServer);

router.post("/create", orderController.createOrderServer);

router.put("/update/:orderId", orderController.updateOrderStatusServer);

module.exports = router;
