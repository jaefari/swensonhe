const { expect } = require('chai');

const container = require('../../container').getTheContainer();

const { addMachineUseCase, addPodUseCase, listMachinesUseCase, makeFakeMachine, makeFakePod, clearDbCollection } = container.cradle;

describe('use-cases list-machines', () => {
  let filter;
  let page;
  let limit;
  beforeEach(async () => {
    filter = {};
    page = 0;
    limit = 10;

    await clearDbCollection('machines');
    await clearDbCollection('pods');
  });

  it('return a list of machines', async () => {
    const createdMachines = await Promise.all(
      [makeFakeMachine(), makeFakeMachine(), makeFakeMachine()].map(addMachineUseCase),
    );

    const result = await listMachinesUseCase({ filter, page, limit });
    const foundMachines = result.machines;

    expect(createdMachines).to.deep.eq(foundMachines);
  });

  it('return a list of recommendedPods if recommendPod is true', async () => {
    const createdMachines = await Promise.all(
      [
        makeFakeMachine({ productType: 'COFFEE_MACHINE_LARGE' }),
        makeFakeMachine({ productType: 'COFFEE_MACHINE_LARGE' }),
        makeFakeMachine({ productType: 'COFFEE_MACHINE_SMALL' }),
      ].map(addMachineUseCase),
    );

    const createdPods = await Promise.all(
      [
        makeFakePod({ productType: 'COFFEE_POD_LARGE' }),
        makeFakePod({ productType: 'COFFEE_POD_LARGE' }),
        makeFakePod({ productType: 'ESPRESSO_POD' }),
      ].map(addPodUseCase),
    );

    filter = { productType: 'COFFEE_MACHINE_LARGE' };

    const result = await listMachinesUseCase({ filter, page, limit, recommenedPods: true });
    const { machines, recommendedPods } = result;

    expect(machines).to.deep.eq(createdMachines.slice(0, 2));
    expect(recommendedPods).to.deep.eq(createdPods.slice(0, 2));
  });
});
