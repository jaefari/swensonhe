const { expect } = require('chai');

const container = require('../../container').getTheContainer();

const { makePod, makeFakePod } = container.cradle;

describe('model Pod', () => {
  it('should not throw error for valid payloads', () => {
    const validPayload = makeFakePod();

    expect(() => makePod(validPayload)).not.not.throw();
  });

  it('should throw error for payload that has no productId', () => {
    const invalidPayload = makeFakePod({ productId: undefined });

    expect(() => makePod(invalidPayload)).to.throw();
  });

  it('should throw error for payload that has no productType', () => {
    const invalidPayload = makeFakePod({ productType: undefined });

    expect(() => makePod(invalidPayload)).to.throw();
  });

  it('should throw error for payload that has wrong productType', () => {
    const invalidPayload = makeFakePod({ productType: 'something' });

    expect(() => makePod(invalidPayload)).to.throw();
  });

  it('should throw error for payload that has no packSize', () => {
    const invalidPayload = makeFakePod({ packSize: undefined });

    expect(() => makePod(invalidPayload)).to.throw();
  });

  it('should throw error for payload that has wrong packSize', () => {
    const invalidPayload = makeFakePod({ packSize: 'something' });

    expect(() => makePod(invalidPayload)).to.throw();
  });

  it('should throw error for payload that has no coffeeFlavor', () => {
    const invalidPayload = makeFakePod({ coffeeFlavor: undefined });

    expect(() => makePod(invalidPayload)).to.throw();
  });

  it('should throw error for payload that has wrong coffeeFlavor', () => {
    const invalidPayload = makeFakePod({ coffeeFlavor: 'something' });

    expect(() => makePod(invalidPayload)).to.throw();
  });
});
