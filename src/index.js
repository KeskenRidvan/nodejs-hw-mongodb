require('dotenv').config();

const { initMongoConnection } = require('./db/initMongoConnection');
const { setupServer } = require('./server');

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
