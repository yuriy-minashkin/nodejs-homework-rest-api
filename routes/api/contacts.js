const express = require("express");
const Joi = require("joi");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

const schemaAdd = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const schemaUpdate = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await getContactById(id);
    if (contact) {
      return res.status(200).json(contact);
    }
    res.status(404).json({ message: "Not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const error = schemaAdd.validate(req.body).error;
    if (error) {
      return res.status(400).json({
        message: `missing required field, ${error.details[0].message}.`,
      });
    }
    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await removeContact(id);
    if (result) {
      return res.status(200).json({ message: "Contact deleted" });
    }
    res.status(404).json({ message: "Not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = schemaUpdate.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "missing fields" });
    }
    const id = req.params.contactId;
    const result = await updateContact(id, req.body);
    if (result) {
      return res.status(200).json(result);
    }
    res.status(404).json({ message: "Not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
