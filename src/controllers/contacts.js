const createHttpError = require('http-errors');

const {
  getAllContacts,
  getContactById,
  createContact,
  patchContact,
  deleteContact,
} = require('../services/contacts');

const getAllContactsController = async (req, res) => {
  const contacts = await getAllContacts(req.user._id, req.query);

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

const getContactByIdController = async (req, res) => {
  const contact = await getContactById(req.user._id, req.params.contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  return res.status(200).json({
    status: 200,
    message: 'Successfully found contact!',
    data: contact,
  });
};

const createContactController = async (req, res) => {
  const contact = await createContact({
    ...req.body,
    userId: req.user._id,
  }, req.file);

  return res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

const patchContactController = async (req, res) => {
  const contact = await patchContact(
    req.user._id,
    req.params.contactId,
    req.body,
    req.file
  );

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  return res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
};

const deleteContactController = async (req, res) => {
  const contact = await deleteContact(req.user._id, req.params.contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  return res.status(204).send();
};

module.exports = {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
};
