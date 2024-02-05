/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
const admin = require("firebase-admin");

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
      msg: `An error occurred while getting the user count`,
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
      msg: `An error occurred while getting the user list`,
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
      msg: "An error occurred while deleting the user",
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
    return res.status(200).send({ success: true, user });
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

  try {
    if (req.body.adminId === undefined || req.body.adminId === null) {
      return res.status(400).send({ success: false, msg: "Admin ID is required" });
    }

    const adminUser = await admin.auth().getUser(adminId);
    const isAdmin = adminUser.customClaims && adminUser.customClaims.admin === true;
    if (!isAdmin) {
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
      !user.emailVerified ||
      user.disabled
    ) {
      console.error(`User with email: ${user.email} isn't eligible for an admin role`);
      return res.status(400).send({ success: false, msg: "User isn't eligible for an admin role" });
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

module.exports = {
  userTestProductServer,
  getUserCountServer,
  getUserListServer,
  getUserByIdServer,
  deleteUserByIdServer,
  setAdminRoleServer,
};

// TODO: Create user endpoint, this should be handled by firebase authentication. Upon creation of an account this should create a user collection in firestore based on the uuid of the firebase authentication from the current user

module.exports = {
  userTestProductServer, getUserCountServer, getUserListServer, getUserByIdServer, deleteUserByIdServer, setAdminRoleServer,
};
