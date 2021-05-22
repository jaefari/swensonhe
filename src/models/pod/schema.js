const Joi = require('joi');

module.exports = Joi.object({
  productId: Joi.string().required(),
  productType: Joi.string().valid('COFFEE_POD_LARGE', 'COFFEE_POD_SMALL', 'ESPRESSO_POD').required(),
  packSize: Joi.number().required(),
  coffeeFlavor: Joi.string().valid('COFFEE_FLAVOR_VANILLA', 'COFFEE_FLAVOR_CARAMEL', 'COFFEE_FLAVOR_PSL', 'COFFEE_FLAVOR_MOCHA', 'COFFEE_FLAVOR_HAZELNUT').required(),
});
