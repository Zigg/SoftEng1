/* eslint-disable new-cap */
/* eslint-disable linebreak-style */

const router = require("express").Router();
const admin = require("firebase-admin");
const express = require("express");

/**
 * For testing the orders route
 */
router.get("/", (req, res) => {
  return res.send("Inside the orders router");
});

/**
 * This will be where the order api endpoints will go
 * Update orders(status, details, etc)
 *  Get orders
 */

module.exports = router;
