/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */
const router = require("express").Router();

const userController = require("../../controllers/userController");

router.get("/", userController.userTestProductServer);
router.get("/count", userController.getUserCountServer);
router.get("/list", userController.getUserListServer);

module.exports = router;
