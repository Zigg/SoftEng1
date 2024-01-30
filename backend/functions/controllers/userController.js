/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
const admin = require("firebase-admin");

// NOTE: To get a sample response from these API endpoints refer to the readme in the route directory

const userTestProductServer = (_req, res, next) => {
  res.status(200).send({ success: true, msg: "Inside user route" });
};

/**
 * Retrieves the total count of users.
 * @return {Promise<number>} The total count of users.
 */
const getUserCountServer = async (_req, res, next) => {
  try {
    let count = 0;
    const getCount = async (nextPageToken) => {
      const listUserResults = await admin.auth().listUsers(1000, nextPageToken);
      count += listUserResults.users.length;
      if (listUserResults.pageToken) {
        await getCount(listUserResults.pageToken);
      }
    };
    await getCount();
    return res.status(200).send({ success: true, count });
  } catch (error) {
    console.log(`USER COUNT ERROR [SERVER] ${error.message}`);
    return res.send({
      success: false,
      msg: `USER COUNT ERROR [SERVER] ${error.message}`,
    });
  }
};

/**
 * Retrieves the list of users from firebase
 * @param {string} nextPageToken - The token for the next page results limiting to 1000
 * @return {Promise<Array<Object>>} - A promise that resolves to an array of user objects
 */
/**
 * Retrieves the list of users from the server.
 * @param {Object} _req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - The response object containing the user list or an error message.
 */
const getUserListServer = async (_req, res, next) => {
  const getList = async (nextPageToken) => {
    let data = [];
    const userListResult = await admin.auth().listUsers(1000, nextPageToken);
    userListResult.users.forEach((record) => {
      data.push(record.toJSON());
    });
    if (userListResult.pageToken) {
      const nextPageData = await getList(userListResult.pageToken);
      data = data.concat(nextPageData);
    }
    return data;
  };
  try {
    const data = await getList();
    return res.status(200).send({ success: true, data });
  } catch (error) {
    console.log(`USER LIST ERROR [SERVE] ${error.message}`);
    return res.send({
      success: false,
      msg: `USER LIST ERROR [SERVE] ${error.message}`,
    });
  }
};


// TODO: Add update user details endpoint.

// TODO: Add delete user endpoint with cascading delete.


module.exports = {
  userTestProductServer, getUserCountServer, getUserListServer,
};
