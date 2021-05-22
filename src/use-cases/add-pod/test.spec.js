const { expect } = require('chai');

const container = require('../../container').getTheContainer();

const { addPodUseCase, makeFakePod, clearDbCollection } = container.cradle;

describe('use-cases add-pod', () => {
  beforeEach(async () => {
    await clearDbCollection('pods');
  });

  it('should add a pod and return created pod', async () => {
    const payload = makeFakePod();

    const pod = await addPodUseCase(payload);
    expect(pod).to.include(payload);
  });
});
