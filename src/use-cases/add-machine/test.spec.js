const { expect } = require('chai');

const container = require('../../container').getTheContainer();

const { addMachineUseCase, makeFakeMachine, clearDbCollection } = container.cradle;

describe('use-cases add-machine', () => {
  beforeEach(async () => {
    await clearDbCollection('machines');
  });

  it('should add a machine and return created machine', async () => {
    const payload = makeFakeMachine();

    const machine = await addMachineUseCase(payload);
    expect(machine).to.include(payload);
  });
});
