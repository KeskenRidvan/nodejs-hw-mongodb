require('dotenv').config();

const { readFile } = require('node:fs/promises');
const path = require('node:path');
const mongoose = require('mongoose');

const { initMongoConnection } = require('../db/initMongoConnection');
const Contact = require('../db/models/contact');

const contactsFilePath = path.join(__dirname, '..', 'db', 'data', 'contacts.json');

const importContacts = async () => {
  await initMongoConnection();

  const fileContent = await readFile(contactsFilePath, 'utf-8');
  const contacts = JSON.parse(fileContent);

  const normalizedContacts = contacts.map(
    ({ createdAt: _createdAt, updatedAt: _updatedAt, ...contact }) => contact
  );

  await Contact.deleteMany({});
  await Contact.insertMany(normalizedContacts);

  console.log(`Imported ${normalizedContacts.length} contacts successfully!`);
};

importContacts()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
