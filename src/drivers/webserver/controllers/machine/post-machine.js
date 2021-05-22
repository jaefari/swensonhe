const log = require('debug')('webserver:machine:post-machine');

const container = require('../../../../container').getTheContainer();

const { addMachineUseCase } = container.cradle;

module.exports = async (req, res, next) => {
  try {
    /* DO NOT DELETE SWAGGER DESCRIPTIONS

      #swagger.tags = ['Machines']
      #swagger.description = 'add a new machine'

      #swagger.parameters['machine'] = { in: 'body', schema: { $ref: '#/definitions/Machine' } }

      #swagger.responses[201] = { schema: { $ref: '#/definitions/Response' } }
    */

    const machine = req.body;
    const addedMachine = await addMachineUseCase(machine);

    res.status(201).json({ message: 'machine added', data: addedMachine });

    /*  */
  } catch (error) {
    log(error);
    next(error);
  }
};
