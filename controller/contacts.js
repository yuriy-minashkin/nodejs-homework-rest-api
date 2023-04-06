const service = require("../service/contacts");

const get = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  try {
    const results = await service.listContacts(owner, page, limit, favorite);
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const id = req.params.contactId;
  try {
    const contact = await service.getContactById(id);
    if (contact) {
      return res.status(200).json(contact);
    }
    res.status(404).json({ message: "Not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const create = async (req, res, next) => {
  const { _id: owner } = req.user;
  try {
    const result = await service.addContact(req.body, owner);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const update = async (req, res, next) => {
  const id = req.params.contactId;
  try {
    const result = await service.updateContact(id, req.body);
    if (result) {
      return res.status(200).json(result);
    }
    res.status(404).json({ message: "Not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStatus = async (req, res, next) => {
  const id = req.params.contactId;
  const { favorite } = req.body;
  try {
    if (favorite === undefined) {
      return res.status(400).json({ message: "missing field favorite" });
    }
    const result = await service.updateContact(id, { favorite });
    if (result) {
      return res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const remove = async (req, res, next) => {
  const id = req.params.contactId;
  try {
    const result = await service.removeContact(id);
    if (result) {
      return res.status(200).json({ message: "Contact deleted" });
    }
    res.status(404).json({ message: "Not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  get,
  getById,
  create,
  update,
  updateStatus,
  remove,
};
