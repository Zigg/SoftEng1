/* eslint-disable linebreak-style */
/* eslint-disable max-len */

const router = require("express").Router();
const admin = require("firebase-admin");
const db = admin.firestore();
const express = require("express");

const cartController = require("../../controllers/cartController");

router.get("/", cartController.cartTestRouteServer);
router.post("/add/:userId", cartController.addToCartServer);
router.patch("/update/:userId", cartController.changeCartItemQuantityServer);
router.get("/all", cartController.getAllCartItemsServer);
module.exports = router;
