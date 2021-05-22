const { expect } = require('chai');
const container = require('../../container').getTheContainer();

const { machineDataAccess, makeFakeMachine, clearDbCollection } = container.cradle;

describe('data-access machine', () => {
  let filter;
  let page;
  let limit;
  beforeEach(async () => {
    filter = {};
    page = 0;
    limit = 10;

    await clearDbCollection('machines');
  });

  it('insert a machine', async () => {
    const payload = makeFakeMachine();

    const result = await machineDataAccess.insert(payload);

    expect(result).to.deep.eq(payload);
  });

  it('find all machine based on empty filters', async () => {
    await Promise.all(
      [makeFakeMachine(), makeFakeMachine(), makeFakeMachine()].map(machineDataAccess.insert),
    );

    const foundMachines = await machineDataAccess.findAll({ filter, page, limit });

    expect(foundMachines).to.be.an('array').with.lengthOf(3);
  });

  it('find all machine based on one filter: product_type', async () => {
    const fakeMachines = [
      makeFakeMachine({ productType: 'COFFEE_MACHINE_LARGE' }),
      makeFakeMachine({ productType: 'COFFEE_MACHINE_LARGE' }),
      makeFakeMachine({ productType: 'ESPRESSO_MACHINE' }),
    ];

    await Promise.all(fakeMachines.map(machineDataAccess.insert));

    const foundMachines = await machineDataAccess.findAll({ filter: { productType: 'COFFEE_MACHINE_LARGE' }, page, limit });

    expect(foundMachines).to.be.an('array').with.lengthOf(2);
    expect(foundMachines[0]).to.deep.eq(fakeMachines[0]);
    expect(foundMachines[1]).to.deep.eq(fakeMachines[1]);
  });

  it('find all machine based on two filters: product_type and waterLineCompatible', async () => {
    const fakeMachines = [
      makeFakeMachine({ productType: 'COFFEE_MACHINE_LARGE', waterLineCompatible: true }),
      makeFakeMachine({ productType: 'COFFEE_MACHINE_LARGE', waterLineCompatible: false }),
      makeFakeMachine({ productType: 'ESPRESSO_MACHINE' }),
    ];

    await Promise.all(fakeMachines.map(machineDataAccess.insert));

    const foundMachines = await machineDataAccess.findAll({ filter: { productType: 'COFFEE_MACHINE_LARGE', waterLineCompatible: true }, page, limit });

    expect(foundMachines).to.be.an('array').with.lengthOf(1);
    expect(foundMachines[0]).to.deep.eq(fakeMachines[0]);
  });

  // afterEach(async () => {
  //   await clearDbCollection('machines');
  // });
});
