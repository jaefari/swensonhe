const container = require('../container').getTheContainer();

const { clearDbCollection, closeDb } = container.cradle;

after(async () => {
  await clearDbCollection('machines');
  await clearDbCollection('pods');

  await closeDb();
});
