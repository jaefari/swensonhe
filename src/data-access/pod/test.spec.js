const { expect } = require('chai');
const container = require('../../container').getTheContainer();

const { podDataAccess, makeFakePod, clearDbCollection } = container.cradle;

describe('data-access pod', () => {
  let filter;
  let page;
  let limit;
  beforeEach(async () => {
    filter = {};
    page = 0;
    limit = 10;

    await clearDbCollection('pods');
  });

  it('insert a pod', async () => {
    const payload = makeFakePod();

    const result = await podDataAccess.insert(payload);

    expect(result).to.deep.eq(payload);
  });

  it('find all pods based on empty filter', async () => {
    await Promise.all(
      [makeFakePod(), makeFakePod(), makeFakePod()].map(podDataAccess.insert),
    );

    const foundPods = await podDataAccess.findAll({ filter, page, limit });

    expect(foundPods).to.be.an('array').with.lengthOf(3);
  });

  it('find all pods based on one filter: product_type', async () => {
    const fakePods = [
      makeFakePod({ productType: 'COFFEE_POD_LARGE' }),
      makeFakePod({ productType: 'COFFEE_POD_LARGE' }),
      makeFakePod({ productType: 'ESPRESSO_POD' }),
    ];

    await Promise.all(fakePods.map(podDataAccess.insert));

    const foundPods = await podDataAccess.findAll({ filter: { productType: 'COFFEE_POD_LARGE' }, page, limit });

    expect(foundPods).to.be.an('array').with.lengthOf(2);
    expect(foundPods[0]).to.deep.eq(fakePods[0]);
    expect(foundPods[1]).to.deep.eq(foundPods[1]);
  });

  it('find all pods based on two filters: product_type and coffeeFlavor', async () => {
    const fakePods = [
      makeFakePod({ productType: 'COFFEE_POD_LARGE', coffeeFlavor: 'COFFEE_FLAVOR_VANILLA' }),
      makeFakePod({ productType: 'COFFEE_POD_LARGE', coffeeFlavor: 'COFFEE_FLAVOR_CARAMEL' }),
      makeFakePod({ productType: 'ESPRESSO_POD' }),
    ];

    await Promise.all(fakePods.map(podDataAccess.insert));

    const foundPods = await podDataAccess.findAll({ filter: { productType: 'COFFEE_POD_LARGE', coffeeFlavor: 'COFFEE_FLAVOR_VANILLA' }, page, limit });

    expect(foundPods).to.be.an('array').with.lengthOf(1);
    expect(foundPods[0]).to.deep.eq(fakePods[0]);
  });

  // afterEach(async () => {
  //   await clearDbCollection('pods');
  // });
});
