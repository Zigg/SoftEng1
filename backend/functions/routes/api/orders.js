/* eslint-disable linebreak-style */
/* eslint-disable new-cap */

const router = require("express").Router();
const admin = require("firebase-admin");
const express = require("express");

const orderController = require("../../controllers/orderController");

router.get("/", orderController.orderTestRouteServer);


module.exports = router;
