const { Schema, model } = require('mongoose');

const STRING_FIELD_RULES = {
  minlength: 3,
  maxlength: 20,
};

const contactSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      ...STRING_FIELD_RULES,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      ...STRING_FIELD_RULES,
    },
    email: {
      type: String,
      trim: true,
      ...STRING_FIELD_RULES,
    },
    photo: {
      type: String,
      trim: true,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
      ...STRING_FIELD_RULES,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Contact = model('Contact', contactSchema, 'contacts');

module.exports = Contact;
