/* eslint-disable linebreak-style */
/* eslint-disable new-cap */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
/* eslint-disable linebreak-style */
const router = require("express").Router();
const admin = require("firebase-admin");
let data = [];

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
    await admin
      .auth()
      .listUsers(1000, nextPageToken)
      .then((listUserResults) => {
        count += listUserResults.users.length;
        if (listUserResults.pageToken) {
          return getCount(listUserResults.pageToken);
        }
      })
      .catch((er) => console.log(er));
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
      msg: `Error in getting user count :,${er}`,
    });
  }
});

const userList = (nextPageToken) => {
  return admin
    .auth()
    .listUsers(1000, nextPageToken)
    .then((userListResult) => {
      userListResult.users.forEach((rec) => {
        data.push(rec.toJSON());
      });
      if (userListResult.pageToken) {
        return userList(userListResult.pageToken);
      }
    })
    .catch((er) => console.log(er));
};

router.get("/list", async (req, res) => {
  data = [];
  await userList();
  try {
    return res
      .status(200)
      .send({ success: true, data: data, dataCount: data.length });
  } catch (er) {
    return res.send({
      success: false,
      msg: `Error in listing users :,${er}`,
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
