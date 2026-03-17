const Contact = require('../db/models/contact');

const getAllContacts = () => Contact.find();

const getContactById = (contactId) => Contact.findById(contactId);

module.exports = {
  getAllContacts,
  getContactById,
};
