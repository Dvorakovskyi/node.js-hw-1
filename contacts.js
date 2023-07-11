import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.resolve("db", "contacts.json");

export const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

export const getContactById = async (contactID) => {
  const contacts = await listContacts();

  const foundContact = contacts.find((contact) => contact.id === contactID);
  return foundContact || null;
};

export const updateContacts = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const removeContact = async (contactID) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === contactID);

  if (index === -1) {
    return null;
  }

  const [contactToRemove] = contacts.splice(index, 1);

  await updateContacts(contacts);

  return contactToRemove;
};

export const addContact = async (name, email, phone) => {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  const contacts = await listContacts();

  contacts.push(newContact);

  await updateContacts(contacts);

  return newContact;
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
