module.exports = function buildMakePod({ podValidator }) {
  return ({ productId, productType, packSize, coffeeFlavor }) => {
    podValidator({ productId, productType, packSize, coffeeFlavor });

    return Object.freeze({
      getproductId: () => productId,
      getProductType: () => productType,
      getPackSize: () => packSize,
      getCoffeeFlavor: () => coffeeFlavor,
    });
  };
};
