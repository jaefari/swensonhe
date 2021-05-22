const log = require('debug')('utils:database');

/* eslint-disable no-underscore-dangle */
const { MongoClient } = require('mongodb');

let client;
let db;

// eslint-disable-next-line consistent-return
const makeDb = async ({ MONGO_URI, MONGO_DB_NAME }) => {
  try {
    if (!client) client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    if (!client.isConnected()) await client.connect();
    if (!db) db = client.db(MONGO_DB_NAME);

    return db;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('❌ dataabse is not connected', error);
    log(error);
  }
};

const closeDb = async () => {
  await client.close();
};

// eslint-disable-next-line consistent-return
const clearDbCollection = async (collection) => {
  if (client.isConnected()) return db.collection(collection).deleteMany({});
};

module.exports = {
  makeDb,
  closeDb,
  clearDbCollection,
};
