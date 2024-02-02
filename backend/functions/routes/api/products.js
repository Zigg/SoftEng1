/* eslint-disable linebreak-style */
/* eslint-disable new-cap */

const router = require("express").Router();

const productController = require("../../controllers/productController");

router.get("/", productController.productTestRouteServer);
router.post("/create", productController.addNewProductServer);
router.get("/all", productController.getAllProductsServer);
router.get("/:productId", productController.getProductByIdServer);
// TODO:
router.patch("/update/:productId", productController.updateProductByIdServer);
router.delete("/delete/:productId", productController.deleteProductByIdServer);

module.exports = router;
