const express = require("express");
const user = require("../../controller/users");
const { authenticate } = require("../../middlewares/authenticate");
const {
  schemaUserValidate,
} = require("../../middlewares/validationMiddlewares");

const router = express.Router();

router.post("/register", schemaUserValidate, user.registerUser);
router.post("/login", schemaUserValidate, user.loginUser);
router.get("/current", authenticate, user.getCurrentUser);
router.post("/logout", authenticate, user.logoutUser);
router.patch("/", authenticate, user.updateUser);

module.exports = router;
