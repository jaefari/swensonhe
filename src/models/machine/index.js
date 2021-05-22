module.exports = function buildMakeMachine({ machineValidator }) {
  return ({ productId, model, productType, waterLineCompatible }) => {
    machineValidator({ productId, model, productType, waterLineCompatible });

    return Object.freeze({
      getproductId: () => productId,
      getModel: () => model,
      getProductType: () => productType,
      getWaterLineCompatible: () => waterLineCompatible,
    });
  };
};
