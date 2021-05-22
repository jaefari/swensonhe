module.exports = function buildListPods({ podDataAccess }) {
  return async ({ filter, page, limit }) => {
    const pods = await podDataAccess.findAll({ filter, page, limit });
    return { pods };
  };
};
