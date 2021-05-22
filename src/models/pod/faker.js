module.exports = function makeFakeMachine({ faker }) {
  return (overrides) => {
    const fake = {

      productId: faker.datatype.string(5),
      productType: faker.random.arrayElement(['COFFEE_POD_LARGE', 'COFFEE_POD_SMALL', 'ESPRESSO_POD']),
      packSize: faker.random.arrayElement([12, 36, 60, 84]),
      coffeeFlavor: faker.random.arrayElement(['COFFEE_FLAVOR_VANILLA', 'COFFEE_FLAVOR_CARAMEL', 'COFFEE_FLAVOR_PSL', 'COFFEE_FLAVOR_MOCHA', 'COFFEE_FLAVOR_HAZELNUT']),
    };

    return {
      ...fake,
      ...overrides,
    };
  };
};
