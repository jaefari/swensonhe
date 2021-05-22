const { expect } = require('chai');

const container = require('../../container').getTheContainer();

const { makeMachine, makeFakeMachine } = container.cradle;

describe('model Machine', () => {
  it('should not throw error for valid payloads', () => {
    const validPayload = makeFakeMachine();

    expect(() => makeMachine(validPayload)).not.not.throw();
  });

  it('should throw error for payload that has no productId', () => {
    const invalidPayload = makeFakeMachine({ productId: undefined });

    expect(() => makeMachine(invalidPayload)).to.throw();
  });

  it('should throw error for payload that has no model', () => {
    const invalidPayload = makeFakeMachine({ model: undefined });

    expect(() => makeMachine(invalidPayload)).to.throw();
  });

  it('should throw error for payload that has wrong model', () => {
    const invalidPayload = makeFakeMachine({ model: 'something' });

    expect(() => makeMachine(invalidPayload)).to.throw();
  });

  it('should throw error for payload that has no productType', () => {
    const invalidPayload = makeFakeMachine({ productType: undefined });

    expect(() => makeMachine(invalidPayload)).to.throw();
  });

  it('should throw error for payload that has wrong productType', () => {
    const invalidPayload = makeFakeMachine({ productType: 'something' });

    expect(() => makeMachine(invalidPayload)).to.throw();
  });

  it('should throw error for payload that has no waterLineCompatible', () => {
    const invalidPayload = makeFakeMachine({ waterLineCompatible: undefined });

    expect(() => makeMachine(invalidPayload)).to.throw();
  });

  it('should throw error for payload that has wrong waterLineCompatible', () => {
    const invalidPayload = makeFakeMachine({ waterLineCompatible: 'something' });

    expect(() => makeMachine(invalidPayload)).to.throw();
  });
});
