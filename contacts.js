import fs from "fs/promises";
import path from "path";

const contactsPath = path.resolve('db', 'contacts.json');

const listContacts = async () => {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
};

const getContactById = async (contactID) => {
    
}