/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable require-jsdoc */
const express = require("express");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const cors = require("cors");

const serviceAccountKey = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

let app = null;

if (!app) {
  app = express();
  app.use(cors({ origin: true }));
  app.use(express.json());
  app.use((_req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    next();
  });

  /**
   * This will be where the routes are initialized globally
   */
  const userRoute = require("./routes/api/users");
  app.use("/api/users", userRoute);

  const productRoute = require("./routes/api/products");
  app.use("/api/products", productRoute);

  const ordersRoute = require("./routes/api/orders");
  app.use("/api/orders", ordersRoute);

  const cartRoute = require("./routes/api/cart");
  app.use("/api/cart", cartRoute);

  // TODO:
  const reportRoute = require("./routes/api/report");
  app.use("/api/reports", reportRoute);

  const checkoutRoute = require("./routes/api/checkout");
  app.use("/api/checkout", checkoutRoute);

  /**
   * This routes is only for testing purposes
   * Create a GET Request to the given BASEURL from firebase
   * Make sure to run the backend server first using the command
   * npm run serve
   * NOTE: make sure to be in the backend/functions directory
   */
  app.get("/", (_req, res) => {
    res.send("Hello World");
  });
}

exports.app = functions.https.onRequest(app);
