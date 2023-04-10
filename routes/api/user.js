const express = require("express");
const user = require("../../controller/users");
const { authenticate } = require("../../middlewares/authenticate");
const { upload } = require("../../middlewares/upload");
const {
  schemaUserValidate,
} = require("../../middlewares/validationMiddlewares");

const router = express.Router();

router.post("/register", schemaUserValidate, user.registerUser);
router.post("/login", schemaUserValidate, user.loginUser);
router.get("/current", authenticate, user.getCurrentUser);
router.patch("/", authenticate, user.updateUser);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  user.updateUserAvatar
);
router.post("/logout", authenticate, user.logoutUser);

module.exports = router;
