const service = require("../service/contacts");

const get = async (req, res, next) => {
  try {
    const results = await service.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        tasks: results,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
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
  const { name, email, phone } = req.body;
  try {
    const result = await service.addContact({ name, email, phone });
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
