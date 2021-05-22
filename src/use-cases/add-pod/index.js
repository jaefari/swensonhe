module.exports = function buildAddPod({ makePod, podDataAccess }) {
  return (podInfo) => {
    const pod = makePod(podInfo);

    return podDataAccess.insert({
      productId: pod.getproductId(),
      productType: pod.getProductType(),
      packSize: pod.getPackSize(),
      coffeeFlavor: pod.getCoffeeFlavor(),
    });
  };
};
