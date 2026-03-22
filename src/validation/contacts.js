const createHttpError = require('http-errors');
const { Types } = require('mongoose');

const Contact = require('../db/models/contact');

const buildValidationPayload = (payload) => ({
  ...payload,
  userId: new Types.ObjectId(),
});

const createContactSchema = {
  async validate(payload) {
    const contact = new Contact(buildValidationPayload(payload));
    await contact.validate();
  },
};

const updateContactSchema = {
  async validate(payload, req) {
    const payloadKeys = Object.keys(payload || {});

    if (payloadKeys.length === 0 && !req.file) {
      throw createHttpError(400, 'Body must have at least one field');
    }

    if (payloadKeys.length === 0) {
      return;
    }

    const contact = new Contact(buildValidationPayload(payload));
    await contact.validate(payloadKeys);
  },
};

module.exports = {
  createContactSchema,
  updateContactSchema,
};
