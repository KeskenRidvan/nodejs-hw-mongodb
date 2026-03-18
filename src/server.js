const express = require('express');
const cors = require('cors');
const pino = require('pino-http');

const contactsRouter = require('./routers/contacts');
const { notFoundHandler } = require('./middlewares/notFoundHandler');
const { errorHandler } = require('./middlewares/errorHandler');

const setupServer = () => {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(cors());
  app.use(express.json());
  app.use(pino());

  app.use('/contacts', contactsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

module.exports = {
  setupServer,
};
