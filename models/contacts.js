const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const result = contacts.find(
      (contact) => contact.id === contactId.toString()
    );
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const newContacts = contacts.filter(
      (contact) => contact.id !== contactId.toString()
    );
    const newContactsData = JSON.stringify(newContacts);
    if (contacts.length === newContacts.length) {
      throw new Error("Contact not found");
    }
    try {
      await fs.writeFile(contactsPath, newContactsData);
      return newContacts;
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
}

async function addContact(body) {
  try {
    const contacts = await listContacts();
    const newId = uuidv4();
    const newContact = { id: newId, ...body };
    const newContactsList = JSON.stringify(
      [newContact, ...contacts],
      null,
      "\t"
    );
    try {
      await fs.writeFile(contactsPath, newContactsList);
      return newContact;
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
}

async function updateContact(contactId, body) {
  try {
    const contacts = await listContacts();
    const updateContactId = contacts.findIndex(
      (contact) => contact.id === contactId.toString()
    );
    if (updateContactId === -1) {
      return null;
    }
    contacts[updateContactId] = { ...contacts[updateContactId], ...body };
    const newContacts = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, newContacts);
    return contacts[updateContactId];
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
