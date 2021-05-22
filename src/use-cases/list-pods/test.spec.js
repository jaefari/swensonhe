const { expect } = require('chai');

const container = require('../../container').getTheContainer();

const { addPodUseCase, listPodsUseCase, makeFakePod, clearDbCollection } = container.cradle;

describe('use-cases list-pods', () => {
  let filter;
  let page;
  let limit;
  beforeEach(async () => {
    filter = {};
    page = 0;
    limit = 10;

    await clearDbCollection('pods');
  });

  it('return a list of pods', async () => {
    const createdPods = await Promise.all(
      [makeFakePod(), makeFakePod(), makeFakePod()].map(addPodUseCase),
    );

    const result = await listPodsUseCase({ filter, page, limit });
    const { pods } = result;

    expect(createdPods).to.deep.eq(pods);
  });
});
