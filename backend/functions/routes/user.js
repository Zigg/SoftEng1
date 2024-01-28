/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */
const router = require("express").Router();
const admin = require("firebase-admin");

/**
 * This route is just only for testing purposes make sure to
 * check whether on not this route returns the follow response
 */
router.get("/", (req, res) => {
  return res.send("Inside the user router");
});

/**
 * Retrieves the total count of users.
 * @return {Promise<number>} The total count of users.
 */
const getUserCount = async () => {
  let count = 0;
  const getCount = async (nextPageToken) => {
    const listUserResults = await admin.auth().listUsers(1000, nextPageToken);
    count += listUserResults.users.length;
    if (listUserResults.pageToken) {
      return getCount(listUserResults.pageToken);
    }
  };

  await getCount();
  return count;
};

router.get("/count", async (req, res) => {
  try {
    const count = await getUserCount();
    return res.status(200).send({ success: true, count });
  } catch (er) {
    return res.send({
      success: false,
      msg: `Error in getting user count: ${er}`,
    });
  }
});

/**
 * Retrieves a list of users from firebase
 * @param {string} nextPageToken - The token for the next page results limiting to 1000
 * @return {Promise<Array<Object>>} - A promise that resolves to an array of user objects
 */
const getUserList = async (nextPageToken) => {
  let data = [];
  const userListResult = await admin.auth().listUsers(1000, nextPageToken);
  userListResult.users.forEach((record) => {
    data.push(record.toJSON());
  });
  if (userListResult.pageToken) {
    const nextPageData = await getUserList(userListResult.pageToken);
    data = data.concat(nextPageData);
  }
  return data;
};

/**
 * API Endpoint for the list
 */
router.get("/list", async (req, res) => {
  try {
    const data = await getUserList();
    return res.status(200).send({ success: true, data, dataCount: data.length });
  } catch (er) {
    return res.send({
      success: false,
      msg: `Error in listing users: ${er}`,
    });
  }
});

// TODO:
/**
 * This will be where the update user details will go
 */

// TODO:
/**
 * This will be where the delete user, make sure to use cascading delete
 */

module.exports = router;
