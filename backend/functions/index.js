const express = require("express");
const admin = require("firebase-admin");
const functions = require("firebase-functions");

const serviceAccountKey = require("./serviceAccountKey.json");

// TODO: Setup up admin credentials for firebase, still checking

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

const app = express();

app.use(express.json());

const cors = require("cors");
app.use(cors({origin: true}));

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

// TODO: Setup user routes
// TODO: Check this route
const userRoute = require("./routes/user");
app.use("/api/users", userRoute);

exports.app = functions.https.onRequest(app);
