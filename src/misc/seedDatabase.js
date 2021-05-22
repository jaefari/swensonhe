const container = require('../container').getTheContainer();

const { makeDb, clearDbCollection, closeDb } = container.cradle;

const seeds = require('./seed.json');

(async () => {

  const database = await makeDb;

  await clearDbCollection('machines');
  await clearDbCollection('pods');

  await database.collection('machines').insertMany(seeds.machines);
  await database.collection('pods').insertMany(seeds.pods);

  await closeDb();

  console.log('seed process completed');
})();
