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

app.use(cors({origin: true}));
app.use(express.json());

// TODO: Setup user routes
const userRoute = require("./routes/user");
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

exports.app = functions.https.onRequest(app);
