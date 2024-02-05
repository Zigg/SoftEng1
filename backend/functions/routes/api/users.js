/* eslint-disable linebreak-style */
/* eslint-disable new-cap */
const router = require("express").Router();

const userController = require("../../controllers/userController");

router.get("/", userController.userTestProductServer);
router.get("/count", userController.getUserCountServer);
router.get("/list", userController.getUserListServer);
router.get("/:userId", userController.getUserByIdServer);

router.post("/setAdminRole/:userId", userController.setAdminRoleServer);

router.delete("/:userId", userController.deleteUserByIdServer);

module.exports = router;
