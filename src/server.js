const express = require('express');
const cors = require('cors');
const pino = require('pino-http');

const {
  getAllContactsController,
  getContactByIdController,
} = require('./controllers/contacts');

const setupServer = () => {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(cors());
  app.use(express.json());
  app.use(pino());

  app.get('/contacts', getAllContactsController);
  app.get('/contacts/:contactId', getContactByIdController);

  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((error, _req, res, _next) => {
    if (error.name === 'CastError' && error.path === '_id') {
      return res.status(404).json({
        message: 'Contact not found',
      });
    }

    return res.status(500).json({
      message: 'Something went wrong',
    });
  });

  return app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

module.exports = {
  setupServer,
};
