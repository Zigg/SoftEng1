/* eslint-disable linebreak-style */
/* eslint-disable max-len */

const router = require("express").Router();
const admin = require("firebase-admin");
const db = admin.firestore();
const express = require("express");

const cartController = require("../../controllers/cartController");

router.get("/", cartController.cartTestRouteServer);

module.exports = router;
