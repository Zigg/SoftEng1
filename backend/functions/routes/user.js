/* eslint-disable linebreak-style */
/* eslint-disable new-cap */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
/* eslint-disable linebreak-style */
const router = require("express").Router();
const admin = require("firebase-admin");

router.get("/", (req, res) => {
  return res.send("Inside the user router");
});

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


// eslint-disable-next-line linebreak-style
module.exports = router;
