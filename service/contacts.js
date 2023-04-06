const Contact = require("./schemas/contactSchema");

const listContacts = async (owner, page, limit, favorite) => {
  const skip = (page - 1) * limit;
  const checkFavorite = {
    ...(favorite === undefined ? { owner } : { owner, favorite }),
  };

  const contacts = await Contact.find(checkFavorite, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "_id email subscription");
  return contacts;
};

const getContactById = async (contactId) => {
  const contactById = await Contact.findById(contactId);
  return contactById;
};

const addContact = (body, owner) => {
  return Contact.create({ ...body, owner });
};

const updateContact = async (contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { $set: { ...body } },
    { new: true }
  );
  return updatedContact;
};

const updateStatusContact = async (contactId, favorite) => {
  const updatedStatus = await Contact.findByIdAndUpdate(
    contactId,
    { $set: { favorite } },
    { new: true }
  );
  return updatedStatus;
};

const removeContact = async (contactId) => {
  const contacts = await Contact.findByIdAndRemove(contactId);
  return contacts;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  removeContact,
};
