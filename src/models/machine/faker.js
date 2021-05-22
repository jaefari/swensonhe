module.exports = function makeFakeMachine({ faker }) {
  return (overrides) => {
    const fake = {

      productId: faker.datatype.string(5),
      model: faker.random.arrayElement(['base', 'premium', 'deluxe']),
      productType: faker.random.arrayElement(['COFFEE_MACHINE_LARGE', 'COFFEE_MACHINE_SMALL', 'ESPRESSO_MACHINE']),
      waterLineCompatible: faker.datatype.boolean(),
    };

    return {
      ...fake,
      ...overrides,
    };
  };
};
