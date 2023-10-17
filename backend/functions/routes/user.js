/* eslint-disable linebreak-style */
// This is the router for the user route
// TODO: WTF is the problem??
// I dont think this is causing runtime errors just the eslint config throwing
// errors
// TODO: Test user routes
const userRouter = require("express").Router();
const admin = require("firebase-admin");
userRouter.get("/", (req, res) => {
  res.send("Hello World User Route");
});

// TODO: Testing the tokens for jwt, making sure the
// endpoints are wokring as intended
// Might not need this route
// userRouter.get("/jwtVerification", async (req, res) => {
//   if (!req.headers.authorization) {
//     res.status(500).send({msg: "Internal Server Error"});
//   }
//   // To split the token from the bearer
//   const token = req.headers.authorization.split(" ")[1];

//   try {
//     const value = await admin.auth().verifyIdToken(token);
//     if (!value) {
//       return res.status(401).json({success: false, msg: "Unauthorized"});
//     }
//     return res.status(200).json({success: true, msg: "Authorized"});
//   } catch (error) {
//     return res.send({success: false, msg: "Invalid Token"});
//   }
// });

module.exports = userRouter;
