const log = require('debug')('webserver:machine:get-machine');

const container = require('../../../../container').getTheContainer();

const { listMachinesUseCase } = container.cradle;

module.exports = async (req, res, next) => {
  try {
    /* DO NOT DELETE SWAGGER DESCRIPTIONS

      #swagger.tags = ['Machines']
      #swagger.description = 'get a list of machines'

      #swagger.parameters['waterLineCompatible'] = { type: 'boolean' }

      #swagger.parameters['page'] = { type: 'integer' }

      #swagger.parameters['limit'] = { description: 'default is 5', type: 'integer' }

      #swagger.parameters['recommenedPods'] = {
        description: 'the simplest recommendation system, right now onjustly works if you also filter based on productType',
        type: 'boolean',
      }

      #swagger.responses[200] = { schema: { $ref: '#/definitions/Response' } }
    */

    const filter = {};
    if (req.query.productType) filter.productType = req.query.productType;
    if (req.query.waterLineCompatible) filter.waterLineCompatible = (req.query.waterLineCompatible === 'true');
    if (req.query.model) filter.model = req.query.model;

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

    let recommenedPods;
    if (req.query.recommenedPods) {
      if (req.query.recommenedPods !== 'true' && req.query.recommenedPods !== 'false') {
        const error = Error('recommenedPods should be true or false');
        error.status = 400;
        throw error;
      } else recommenedPods = (req.query.recommenedPods === 'true');
    }

    const result = await listMachinesUseCase({ filter, page, limit, recommenedPods });
    const { machines, recommendedPods } = result;

    if (machines.length > 0) res.status(200).json({ message: 'list of machines fetched', data: { machines, recommendedPods } });

    if (machines.length === 0) {
      const error = new Error(`no machine found based of filter: ${JSON.stringify(filter)}, page: ${page}, limit: ${limit}`);
      error.status = 404;
      throw error;
    }
  } catch (error) {
    log(error);
    next(error);
  }
};
