const admin = require("firebase-admin");
const db = admin.firestore();
const tokensCollectionRef = db.collection("tokens");
const { verifyToken } = require("../helpers/tokens/tokenActions");

const checkToken = async (req, res) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader && authorizationHeader.split(" ")[1];

    if (!token) {
      return res.status(401).send({ success: false, msg: "Token required for Authorization" });
    }

    const verifiedToken = await verifyToken(token, res, req);
    const tokenDoc = await tokensCollectionRef.doc(token).get();

    if (!tokenDoc.exists && !verifiedToken) {
      return res.status(404).send({ success: false, msg: "Token not found" });
    }

    return tokenDoc.data();
  } catch (error) {
    console.error("Error:", error);
    res.status(403).send({ success: false, msg: "You are not authorized" });
  }
};

const checkAdminRole = async (req, res, next) => {
  try {
    const tokenData = await checkToken(req, res);

    // TODO: Cache the role value, and check if the token is still valid, use an in memory store, maybe
    const role = tokenData.role;

    if (role === "admin") {
      return next();
    }
    return res.status(403).send({ success: false, msg: "You are not authorized!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(403).send({ success: false, msg: "You are not authorized" });
  }
};

module.exports = {
  checkAdminRole,
};
