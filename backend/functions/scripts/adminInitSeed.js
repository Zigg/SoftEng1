const { app } = require("../index.js");
const admin = require("firebase-admin");
/**
 * Initializes the admin role.
 * @return {Promise<Object>} The user record.
 */
async function initializeAdminRole() {
  const defaultName = "admin-user";
  const defaultEmail = "admin@email.com";
  const defaultPassword = "admin1234";
  const emailVerified = true;

  try {
    const userRecord = await admin.auth().createUser({
      displayName: defaultName,
      email: defaultEmail,
      password: defaultPassword,
      emailVerified: emailVerified,
    });
    return userRecord;
  } catch (error) {
    console.error("Error initializing admin:", error);
    throw error;
  }
}

initializeAdminRole()
  .then((userRecord) => {
    console.log("Admin role initialized successfully:", userRecord.uid);
    try {
      admin.auth().setCustomUserClaims(userRecord.uid, { admin: true });
      console.log("Custom claims set for admin role:", userRecord.uid);
    } catch (error) {
      console.error("Error setting custom claims for admin role:", error.message);
    }
  })
  .catch((error) => {
    console.error("Error initializing admin role:", error);
  });

module.exports = initializeAdminRole;
