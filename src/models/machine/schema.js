const Joi = require('joi');

module.exports = Joi.object({
  productId: Joi.string().required(),
  model: Joi.string().valid('base', 'premium', 'deluxe').required(),
  productType: Joi.string().valid('COFFEE_MACHINE_LARGE', 'COFFEE_MACHINE_SMALL', 'ESPRESSO_MACHINE').required(),
  waterLineCompatible: Joi.boolean().required(),
});
