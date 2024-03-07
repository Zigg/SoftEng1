const admin = require("firebase-admin");

const axios = require('axios').default;

//Make sure to add your own api key to the .env file from backend/functions
//Example: VITE_FIREBASE_API_KEY=your_own_api_key
//                          ^^^^^^^^^^^^^^^^
require('dotenv').config();
const FIREBASE_API_KEY= process.env.VITE_FIREBASE_API_KEY;

// NOTE: To get a sample response from these API endpoints refer to the readme in the route directory

const userTestProductServer = (_req, res, next) => {
  res.status(200).send({ success: true, msg: "Inside user route" });
};

const getUserCountServer = async (_req, res, next) => {
  try {
    const listAllUsers = async (nextPageToken) => {
      let count = 0;
      let pageToken = nextPageToken;
      do {
        const listUserResults = await admin.auth().listUsers(1000, pageToken);
        count += listUserResults.users.length;
        pageToken = listUserResults.pageToken;
      } while (pageToken);
      return count;
    };

    const count = await listAllUsers();
    return res.status(200).send({ success: true, count });
  } catch (error) {
    console.log(`USER COUNT ERROR [SERVER] ${error.message}`);
    return res.status(500).send({
      success: false,
      msg: `USER COUNT ERROR [SERVER]`,
      error: error.message,
    });
  }
};

const getAllUsers = async (nextPageToken) => {
  let data = [];
  try {
    const userListResult = await admin.auth().listUsers(1000, nextPageToken);
    userListResult.users.forEach((record) => {
      data.push(record.toJSON());
    });
    if (userListResult.pageToken) {
      const nextPageData = await getAllUsers(userListResult.pageToken);
      data = data.concat(nextPageData);
    }
  } catch (error) {
    console.log(`GET ALL USERS ERROR [SERVER] ${error.message}`);
    throw new Error(`An error occurred while getting all users: ${error.message}`);
  }
  return data;
};

const getUserListServer = async (_req, res, next) => {
  try {
    const data = await getAllUsers();
    return res.status(200).send({ success: true, data });
  } catch (error) {
    console.log(`USER LIST ERROR [SERVER] ${error.message}`);
    return res.status(500).send({
      success: false,
      msg: `USER LIST ERROR [SERVER]`,
      error: error.message,
    });
  }
};

const deleteUserByIdServer = async (req, res, next) => {
  const id = req.params.userId;
  try {
    const user = await admin.auth().getUser(id);
    if (!user) {
      return res.status(404).send({ success: false, msg: "User not found" });
    }

    await admin.auth().deleteUser(id);

    return res.status(200).send({ success: true, msg: "User deleted successfully" });
  } catch (error) {
    console.error(`DELETE USER BY ID ERROR [SERVER] ${error.message}`);
    return res.status(500).send({
      success: false,
      msg: "DELETE USER BY ID ERROR [SERVER] ",
      error: error.message,
    });
  }
};

const getUserByIdServer = async (req, res, next) => {
  const id = req.params.userId;
  try {
    const user = await admin.auth().getUser(id);
    if (!user) {
      return res.status(404).send({ success: false, msg: "User not found" });
    }
    return res.status(200).send({ success: true, data: user });
  } catch (error) {
    console.log(`GET USER BY ID ERROR [SERVER] ${error.message}`);
    return res.status(500).send({
      success: false,
      msg: `GET USER BY ID ERROR [SERVER]`,
      error: error.message,
    });
  }
};

const setAdminRoleServer = async (req, res, next) => {
  const id = req.params.userId;
  const adminId = req.body.adminId;
  // TODO: Try to make a more descriptive error message, for why a user is not eligible for the certain role
  try {
    if (adminId === undefined || adminId === null) {
      return res.status(400).send({ success: false, msg: "Admin ID is required" });
    }

    const adminUser = await admin.auth().getUser(adminId);
    const isAdmin = adminUser.customClaims && adminUser.customClaims.admin === true;
    if (!isAdmin) {
      console.error(`Admin not found with ID: ${adminId}`);
      return res.status(400).send({ success: false, msg: `User with id: ${adminId} is not an admin and cannot assign admin role` });
    }

    const user = await admin.auth().getUser(id);
    if (!user) {
      console.error(`User not found with ID: ${id}`);
      return res.status(404).send({ success: false, msg: "User not found" });
    }

    if (
      typeof user.email !== "string" ||
      typeof user.emailVerified !== "boolean" ||
      !user.emailVerified ||
      user.disabled
    ) {
      console.error(`User with email: ${user.email} isn't eligible for an admin role`);
      return res.status(400).send({ success: false, msg: `User with email: ${user.email} isn't eligible for an admin role` });
    }

    const userClaims = await admin.auth().getUser(id).customClaims;
    if (userClaims && userClaims.admin) {
      console.error(`User is already an admin with ID: ${id}`);
      return res.status(400).send({ success: false, msg: "User is already an admin" });
    }

    await admin.auth().setCustomUserClaims(id, { admin: true });

    console.log(`User role updated successfully for ID: ${id}`);
    return res.status(200).send({ success: true, msg: "User role updated successfully" });
  } catch (error) {
    console.error(`SET ADMIN ROLE ERROR [SERVER] ${error.message}`);
    return res.status(500).send({
      success: false,
      msg: "SET ADMIN ROLE ERROR [SERVER]",
      error: error.message,
    });
  }
};


// TODO: This should be the default role set to a user upon creation of an account
const setUserRoleServer = async (req, res, next) => {
  const id = req.params.userId;
  const adminId = req.body.adminId;
  try {
    if (!adminId) {
      return res.status(400).send({ success: false, msg: "Admin ID is required" });
    }

    const adminUser = await admin.auth().getUser(adminId);
    if (!adminUser.customClaims || !adminUser.customClaims.admin) {
      console.error(`Admin not found with ID: ${adminId}`);
      return res.status(404).send({ success: false, msg: `User with id: ${adminId} is not an admin and cannot assign admin role` });
    }

    const user = await admin.auth().getUser(id);
    if (!user) {
      console.error(`User not found with ID: ${id}`);
      return res.status(404).send({ success: false, msg: "User not found" });
    }

    if (
      typeof user.email !== "string" ||
      typeof user.emailVerified !== "boolean" ||
      !user.emailVerified || user.disabled
    ) {
      console.error(`User with email: ${user.email} isn't eligible for a role type of user`);
      return res.status(400).send({ success: false, msg: "User isn't eligible for a role type of user" });
    }

    const userClaims = user.customClaims;
    if (userClaims && userClaims.user) {
      console.error(`User is already a role of type "user" with ID: ${id}`);
      return res.status(400).send({ success: false, msg: "User is already a role of type user" });
    }

    await admin.auth().setCustomUserClaims(id, { user: true });

    console.log(`Role of type "user" updated successfully for ID: ${id}`);
    return res.status(200).send({ success: true, msg: "Role of type user updated successfully" });
  } catch (error) {
    console.error(`SET ROLE OF TYPE USER ERROR [SERVER] ${error.message}`);
    return res.status(500).send({
      success: false,
      msg: "SET ROLE OF TYPE USER ERROR [SERVER]",
      error: error.message,
    });
  }
};

const getUserRoleServer = async (req, res, next) => {
  try {
    const id = req.params.userId;
    const user = await admin.auth().getUser(id);

    if (!user) {
      return res.status(404).send({ success: false, msg: "User not found" });
    }

    if (!user.customClaims || (!user.customClaims.admin && !user.customClaims.user)) {
      return res.status(404).send({ success: false, data: null, msg: "User has no assigned role" });
    }

    return res.status(200).send({ success: true, role: user.customClaims.admin ? "admin" : "user" });
  } catch (error) {
    console.log(`GET USER ROLE ERROR [SERVER] ${error.message}`);
    return res.status(500).send({
      success: false,
      msg: `GET USER ROLE ERROR [SERVER]`,
      error: error.message,
    });
  }
};


const getUserByEmailServer = async (req, res, next) => {
  try {
    const email = req.body.email;

    if (!email) {
      return res.status(400).send({ success: false, msg: "Email is required" });
    }

    const user = await admin.auth().getUserByEmail(email);

    if (!user) {
      return res.status(404).send({ success: false, msg: "User not found" });
    }

    return res.status(200).send({ success: true, data: user });
  } catch (error) {
    console.log(`GET USER BY EMAIL ERROR [SERVER] ${error.message}`);
    return res.status(500).send({
      success: false,
      msg: `GET USER BY EMAIL ERROR [SERVER]`,
      error: error.message,
    });
  }
};

// TODO: Create user endpoint, this should be handled by firebase authentication. Upon creation of an account this should create a user collection in firestore based on the uuid of the firebase authentication from the current user

// login user to get a token for authentication.
const loginUserServer = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await admin.auth().getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'User does not exist' });
    }

    const customToken = await admin.auth().createCustomToken(user.uid);
    const idToken = await exchangeCustomTokenForIdToken(customToken);

    return res.status(200).json({ success: true, idToken });
  } catch (error) {
    console.error(`LOGIN USER ERROR [SERVER]`, error);
    return res.status(500).json({
      success: false,
      message: `LOGIN USER ERROR [SERVER]`,
      error: error.message,
    });
  }
};

// This function is used to exchange a custom token for an id token
const exchangeCustomTokenForIdToken = async (customToken) => {
  try {
    const response = await axios({
      url: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${FIREBASE_API_KEY}`,
      method: 'post',
      data: {
        token: customToken,
        returnSecureToken: true
      },
      json: true,
    });

    return response.data.idToken;
  } catch (error) {
    console.error(`EXCHANGE TOKEN ERROR [SERVER]`, error);
    throw error;
  }
};

module.exports = {
  userTestProductServer, getUserCountServer, getUserListServer, getUserByIdServer, deleteUserByIdServer, setAdminRoleServer, getUserRoleServer, setUserRoleServer, getUserByEmailServer, loginUserServer,
};
