import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts.json");

const updateContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

export const getContactById = async contactId => {
  const allContacts = await listContacts();
  const oneMovie = allContacts.find(({ id }) => id === contactId);
  return oneMovie || null;
};

export const removeContact = async contactId => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  const result = allContacts.splice(index, 1)[0];
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return result;
};

export const addContact = async ({ name, email, phone }) => {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};

export const updateContactById = async (id, { name, email, phone }) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(contact => contact.id === id);
  if (index === -1) {
    return null;
  }
  allContacts[index] = { id, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  // await updateContacts(contacts);
  return allContacts[index];
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
