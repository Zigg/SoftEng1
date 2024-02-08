/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */
/* eslint-disable new-cap */
const express = require("express");
const router = require("express").Router();

const checkoutController = require("../../controllers/checkoutController");

router.get("/", checkoutController.checkoutTestRouteServer);

router.post("/webhook", express.raw({ type: "application/json" }), checkoutController.webhookEvent);

module.exports = router;
