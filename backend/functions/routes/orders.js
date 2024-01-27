/* eslint-disable new-cap */
/* eslint-disable linebreak-style */
const router = require("express").Router();
const admin = require("firebase-admin");

router.get("/", (req, res) => {
  return res.send("Inside the orders router");
});

/**
 * This will be where the order api endpoints will go
 */
