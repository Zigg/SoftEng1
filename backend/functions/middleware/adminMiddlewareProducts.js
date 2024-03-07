const admin = require('firebase-admin');

// Middleware to check if the user is an admin. 
const checkAdminRole = async (req, res, next) => {
    try {
        const idToken = req.headers.authorization || '';
    
        if (!idToken) {
            return res.status(401).send({ success: false, msg: "Authorization required" });
        }
    
        const decodedToken = await admin.auth().verifyIdToken(idToken);
    
        const user = await admin.auth().getUser(decodedToken.uid);
    
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
     checkAdminRole 
};