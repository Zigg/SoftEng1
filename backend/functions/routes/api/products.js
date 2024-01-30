/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */

const router = require("express").Router();
const admin = require("firebase-admin");
const express = require("express");

const productController = require("../../controllers/productController");
/**
 * This is for testing the route
 */

router.get("/", productController.productTestRouteServer);
router.post("/create", productController.addNewProductServer);
router.get("/all", productController.getAllProductsServer);

module.exports = router;
