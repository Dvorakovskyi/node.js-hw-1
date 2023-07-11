import {
  listContacts,
  addContact,
  removeContact,
  getContactById,
} from "./contacts.js";
import { program } from "commander";

const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        const allContacts = await listContacts();
        return console.table(allContacts);
      case "get":
        const contact = await getContactById(id);
        return console.log(contact);
      case "add":
        const newContact = await addContact(name, email, phone);
        return console.log(newContact);
      case "remove":
        const contactToRemove = await removeContact(id);
        return console.log(contactToRemove);
      default:
        console.log("Unknown action type");
    }
  } catch (error) {
    return console.log(error.message);
  }
};

program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

program.parse();

const argv = program.opts();

invokeAction(argv);
