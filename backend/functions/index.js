/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
const express = require("express");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const cors = require("cors");

const serviceAccountKey = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

/**
 * This will be where the routes are initialized globally
 */
const userRoute = require("./routes/user");
app.use("/api/users", userRoute);

const productRoute = require("./routes/products");
app.use("/api/products", productRoute);

/**
 * This routes is only for testing purposes
 * Create a GET Request to the given BASEURL from firebase
 */
app.get("/", (req, res) => {
  res.send("Hello World");
});

exports.app = functions.https.onRequest(app);
