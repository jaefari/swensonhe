module.exports = function makeMachineDataAccess({ makeDb }) {
  const insert = async (machineInfo) => {
    const database = await makeDb;

    const result = await database.collection('machines').insertOne(machineInfo);
    return result.ops[0];
  };

  const findAll = async ({ filter, limit, page }) => {
    const database = await makeDb;

    const result = await database.collection('machines').find(filter).limit(limit).skip(limit * page);
    return result.toArray();
  };

  return Object.freeze({
    insert,
    findAll,
  });
};
