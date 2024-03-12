const admin = require("firebase-admin");

const checkAdminRole = async (req, res, next) => {
  try {
    // NOTE: Assigning the UID to req.headers.authorization for testing, this will later be changed to a bearer token returned by firestore, I will create another endpoint to create an valid api key that will be assigned certain permissions based on the role of the user and the permissions set by the user.
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader && authorizationHeader.split(" ")[1];
    const uid = token;

    if (!uid) {
      return res.status(401).send({ success: false, msg: "UID required for Authorization" });
    }

    const user = await admin.auth().getUser(uid);

    if (!user) {
      return res.status(404).send({ success: false, msg: "User not found" });
    }

    if (user.customClaims && user.customClaims.admin === true) {
      return next();
    }

    return res.status(403).send({ success: false, msg: "You are not authorized!" });
  } catch (error) {
    res.status(403).send({ success: false, msg: "You are not authorized" });
  }
};

module.exports = {
  checkAdminRole,
};
