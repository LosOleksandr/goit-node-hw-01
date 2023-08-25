const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data) || null;
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);
  return index === -1 ? null : data[index];
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);
  const [removedItem] = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return index === -1 ? null : removedItem;
};

const addContact = async (name, email, phone) => {
  const data = await listContacts();
  const newItem = { id: nanoid(), name, email, phone };

  data.push(newItem);

  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newItem || null;
};

const updateContact = async (contactId, options) => {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);
  data[index] = { id: contactId, ...options };
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return index === -1 ? null : data[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
