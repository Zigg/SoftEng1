const admin = require("firebase-admin");
const db = admin.firestore();
const tokensCollectionRef = db.collection("tokens");
const { verifyToken } = require("../helpers/tokens/tokenActions");
const checkAdminRole = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader && authorizationHeader.split(" ")[1];

    if (!token) {
      return res.status(401).send({ success: false, msg: "Token required for Authorization" });
    }
    const verifiedToken = await verifyToken(token);
    console.log("verifiedToken", verifiedToken);
    const tokenDoc = await tokensCollectionRef.doc(token).get();

    if (!tokenDoc.exists) {
      return res.status(404).send({ success: false, msg: "Token not found" });
    }

    const tokenData = tokenDoc.data();

    // NOTE: Check if the token is expired, this is not yet final
    if (tokenData.expires < Date.now()) {
      return res.status(401).send({ success: false, msg: "Token expired" });
    }

    // TODO: Cache the role value
    const role = tokenData.role;

    if (role === "admin") {
      return next();
    }
    return res.status(403).send({ success: false, msg: "You are not authorized!", token: tokenData });
  } catch (error) {
    res.status(403).send({ success: false, msg: "You are not authorized" });
  }
};

module.exports = {
  checkAdminRole,
};
