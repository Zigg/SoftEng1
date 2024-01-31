/* eslint-disable linebreak-style */
/* eslint-disable new-cap */

const router = require("express").Router();
const admin = require("firebase-admin");
const express = require("express");

const orderController = require("../../controllers/orderController");

router.get("/", orderController.orderTestRouteServer);
router.get("/all/:userId", orderController.getAllOrdersServer);
router.post("/create/:userId", orderController.createOrderServer);
router.patch("/update/:orderId", orderController.updateOrderStatusServer);

module.exports = router;
