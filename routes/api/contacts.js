const express = require("express");
const router = express.Router();
const contactCtrl = require("../../controller/contacts");
const { authenticate } = require("../../middlewares/authenticate");
const {
  schemaAdd,
  schemaUpdate,
} = require("../../middlewares/validationMiddlewares");

router.get("/", authenticate, contactCtrl.get);
router.get("/:contactId", authenticate, contactCtrl.getById);
router.post("/", authenticate, schemaAdd, contactCtrl.create);
router.put("/:contactId", authenticate, schemaUpdate, contactCtrl.update);
router.patch(
  "/:contactId/favorite",
  authenticate,
  schemaUpdate,
  contactCtrl.updateStatus
);
router.delete("/:contactId", authenticate, contactCtrl.remove);

module.exports = router;
