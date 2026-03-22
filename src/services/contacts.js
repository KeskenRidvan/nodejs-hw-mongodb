const Contact = require('../db/models/contact');

const SORT_ORDER = {
  asc: 1,
  desc: -1,
};

const SORT_FIELDS = [
  '_id',
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
  'createdAt',
  'updatedAt',
];

const parseNumber = (value, defaultValue) => {
  const parsedValue = Number.parseInt(value, 10);

  if (Number.isNaN(parsedValue) || parsedValue < 1) {
    return defaultValue;
  }

  return parsedValue;
};

const parseBoolean = (value) => {
  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  return undefined;
};

const getAllContacts = async (
  userId,
  {
    page = 1,
    perPage = 10,
    sortBy = '_id',
    sortOrder = 'asc',
    type,
    isFavourite,
  } = {}
) => {
  const currentPage = parseNumber(page, 1);
  const currentPerPage = parseNumber(perPage, 10);
  const currentSortBy = SORT_FIELDS.includes(sortBy) ? sortBy : '_id';
  const filter = { userId };

  if (type) {
    filter.contactType = type;
  }

  const parsedIsFavourite = parseBoolean(isFavourite);

  if (typeof parsedIsFavourite === 'boolean') {
    filter.isFavourite = parsedIsFavourite;
  }

  const [totalItems, contacts] = await Promise.all([
    Contact.countDocuments(filter),
    Contact.find(filter)
      .skip((currentPage - 1) * currentPerPage)
      .limit(currentPerPage)
      .sort({
        [currentSortBy]: SORT_ORDER[sortOrder] || SORT_ORDER.asc,
      }),
  ]);

  const totalPages = Math.ceil(totalItems / currentPerPage);

  return {
    data: contacts,
    page: currentPage,
    perPage: currentPerPage,
    totalItems,
    totalPages,
    hasPreviousPage: currentPage > 1,
    hasNextPage: currentPage < totalPages,
  };
};

const getContactById = (userId, contactId) =>
  Contact.findOne({ _id: contactId, userId });

const createContact = (payload) => Contact.create(payload);

const patchContact = (userId, contactId, payload) =>
  Contact.findOneAndUpdate({ _id: contactId, userId }, payload, {
    new: true,
    runValidators: true,
  });

const deleteContact = (userId, contactId) =>
  Contact.findOneAndDelete({ _id: contactId, userId });

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  patchContact,
  deleteContact,
};
