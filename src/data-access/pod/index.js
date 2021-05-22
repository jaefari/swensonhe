module.exports = function makePodDataAccess({ makeDb }) {
  const insert = async (podInfo) => {
    const database = await makeDb;

    const result = await database.collection('pods').insertOne(podInfo);
    return result.ops[0];
  };

  const findAll = async ({ filter, limit, page }) => {
    const database = await makeDb;

    const result = await database.collection('pods').find(filter).limit(limit).skip(limit * page);
    return result.toArray();
  };

  return Object.freeze({
    insert,
    findAll,
  });
};
