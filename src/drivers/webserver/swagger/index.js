const path = require('path');
const swaggerAutogen = require('swagger-autogen')();

const container = require('../../../container').getTheContainer();

const doc = {
  info: {
    title: 'swensonhe',
    description: 'code challenge',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  definitions: {
    Machine: container.resolve('makeFakeMachine')(),
    Pod: container.resolve('makeFakePod')(),
    Response: {
      message: 'message',
      data: {},
    },
  },
};

const outputFile = path.resolve(__dirname, './swagger-output.json');
const endpointsFiles = [path.resolve(__dirname, '..', 'index.js')];

/* NOTE: if you use the express Router, you must pass in the
   'endpointsFiles' just the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  // eslint-disable-next-line global-require
  require('../index'); // webserver's root file
});
