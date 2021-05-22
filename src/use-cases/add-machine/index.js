module.exports = function buildAddMachine({ makeMachine, machineDataAccess }) {
  return (machineInfo) => {
    const machine = makeMachine(machineInfo);

    return machineDataAccess.insert({
      productId: machine.getproductId(),
      model: machine.getModel(),
      productType: machine.getProductType(),
      waterLineCompatible: machine.getWaterLineCompatible(),
    });
  };
};
