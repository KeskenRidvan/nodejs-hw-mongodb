const express = require('express');

const {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
} = require('../controllers/contacts');
const { isValidId } = require('../middlewares/isValidId');
const { validateBody } = require('../middlewares/validateBody');
const { ctrlWrapper } = require('../utils/ctrlWrapper');
const {
  createContactSchema,
  updateContactSchema,
} = require('../validation/contacts');
const { authenticate } = require('../middlewares/authenticate');

const router = express.Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getAllContactsController));
router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));
router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController)
);
router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController)
);
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

module.exports = router;
