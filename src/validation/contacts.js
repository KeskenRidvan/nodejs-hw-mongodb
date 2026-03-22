const createHttpError = require('http-errors');

const Contact = require('../db/models/contact');

const createContactSchema = {
  async validate(payload) {
    const contact = new Contact(payload);
    await contact.validate();
  },
};

const updateContactSchema = {
  async validate(payload) {
    const payloadKeys = Object.keys(payload || {});

    if (payloadKeys.length === 0) {
      throw createHttpError(400, 'Body must have at least one field');
    }

    const contact = new Contact(payload);
    await contact.validate(payloadKeys);
  },
};

module.exports = {
  createContactSchema,
  updateContactSchema,
};
