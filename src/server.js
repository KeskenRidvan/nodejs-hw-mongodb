const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const pino = require('pino-http');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('../docs/swagger.json');

const authRouter = require('./routers/auth');
const contactsRouter = require('./routers/contacts');
const { notFoundHandler } = require('./middlewares/notFoundHandler');
const { errorHandler } = require('./middlewares/errorHandler');

const setupServer = () => {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(cookieParser());
  app.use(pino());

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use('/auth', authRouter);
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
