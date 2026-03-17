const mongoose = require('mongoose');

const buildMongoConnectionString = () => {
  const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } =
    process.env;

  const missingVariables = [
    ['MONGODB_USER', MONGODB_USER],
    ['MONGODB_PASSWORD', MONGODB_PASSWORD],
    ['MONGODB_URL', MONGODB_URL],
    ['MONGODB_DB', MONGODB_DB],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missingVariables.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVariables.join(', ')}`
    );
  }

  return `mongodb+srv://${encodeURIComponent(MONGODB_USER)}:${encodeURIComponent(MONGODB_PASSWORD)}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;
};

const initMongoConnection = async () => {
  const connectionString = buildMongoConnectionString();

  await mongoose.connect(connectionString);
  console.log('Mongo connection successfully established!');
};

module.exports = {
  initMongoConnection,
};
