const log = require('debug')('webserver:pod:get-pod');

const container = require('../../../../container').getTheContainer();

const { listPodsUseCase } = container.cradle;

module.exports = async (req, res, next) => {
  try {
    /* DO NOT DELETE SWAGGER DESCRIPTIONS

      #swagger.tags = ['Pods']
      #swagger.description = 'get a list of pods'

      #swagger.parameters['packSize'] = { type: 'integer' }

      #swagger.parameters['page'] = { type: 'integer' }

      #swagger.parameters['limit'] = { description: 'default is 5', type: 'integer' }

      #swagger.responses[200] = { schema: { $ref: '#/definitions/Response' } }
    */

    const filter = {};
    if (req.query.productType) filter.productType = req.query.productType;
    if (req.query.coffeeFlavor) filter.coffeeFlavor = req.query.coffeeFlavor;

    if (req.query.packSize) {
      if (!Number.isInteger(Number(req.query.packSize))) {
        const error = new Error('packSize should be integer');
        error.status = 400;
        throw error;
      } else filter.packSize = Number(req.query.packSize);
    }

    // defaults are defined in controller, so the use-case can be called with flexible parameters from other controllers
    let page = 0;
    let limit = 5;
    if (req.query.page) {
      if (!Number.isInteger(Number(req.query.page))) {
        const error = new Error('page should be integer');
        error.status = 400;
        throw error;
      } else page = Number(req.query.page);
    }

    if (req.query.limit) {
      if (!Number.isInteger(Number(req.query.limit))) {
        const error = new Error('limit should be integer');
        error.status = 400;
        throw error;
      } else limit = Number(req.query.limit);
    }

    const { pods } = await listPodsUseCase({ filter, page, limit });

    if (pods.length > 0) res.status(200).json({ message: 'list of pods fetched', data: { pods } });

    if (pods.length === 0) {
      const error = new Error(`no pod found based of filter: ${JSON.stringify(filter)}, page: ${page}, limit: ${limit}`);
      error.status = 404;
      throw error;
    }
  } catch (error) {
    log(error);
    next(error);
  }
};
