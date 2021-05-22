const log = require('debug')('webserver:pod:post-pod');

const container = require('../../../../container').getTheContainer();

const { addPodUseCase } = container.cradle;

module.exports = async (req, res, next) => {
  try {
    /* DO NOT DELETE SWAGGER DESCRIPTIONS

      #swagger.tags = ['Pods']
      #swagger.description = 'add a new pod'

      #swagger.parameters['pod'] = { in: 'body', schema: { $ref: '#/definitions/Pod' } }

      #swagger.responses[201] = { schema: { $ref: '#/definitions/Response' } }
    */

    const pod = req.body;
    const addedPod = await addPodUseCase(pod);

    res.status(201).json({ message: 'pod added', data: addedPod });
  } catch (error) {
    log(error);
    next(error);
  }
};
