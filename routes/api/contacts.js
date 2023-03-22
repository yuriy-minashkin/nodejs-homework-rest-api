const express = require("express");
const router = express.Router();
const contactCtrl = require("../../controller/contacts");
const {
  schemaAdd,
  schemaUpdate,
} = require("../../middlewares/validationMiddlewares");

router.get("/", contactCtrl.get);

router.get("/:contactId", contactCtrl.getById);

router.post("/", schemaAdd, contactCtrl.create);

router.put("/:contactId", schemaUpdate, contactCtrl.update);

router.patch("/:contactId/favorite", schemaUpdate, contactCtrl.updateStatus);

router.delete("/:contactId", contactCtrl.remove);

module.exports = router;
