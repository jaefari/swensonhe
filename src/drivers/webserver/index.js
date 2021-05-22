const express = require('express');
const helmet = require('helmet');
const debug = require('debug');
const cors = require('cors');
const winston = require('winston');
const expressWinston = require('express-winston');
const swStats = require('swagger-stats');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger-output.json');

// Must be imported at root level of execution to inject envs and instances
const container = require('../../container').getTheContainer();

const { WEBSERVER_PORT, NODE_ENV } = container.cradle;

const log = debug('webserver');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

const loggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true }),
  ),
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false; // when not debugging, make terse
  if (typeof global.it === 'function') {
    loggerOptions.level = 'http'; // for non-debug test runs, squelch entirely
  }
}

app.use(expressWinston.logger(loggerOptions));

if (NODE_ENV !== 'test') {
  app.use(swStats.getMiddleware({ swaggerSpec: swaggerDocument }));
}
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// health check
app.get('/', (req, res) => res.status(200).send('ok'));

// routes
const machineRoute = require('./routes/machine');
const podRoute = require('./routes/pod');

app.use('/machines', machineRoute);
app.use('/pods', podRoute);


// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  log(err);

  const error = { message: err.message, status: err.status };

  if (error.message.includes('ValidationError') && !error.status) error.status = 400;

  res.status(error.status || 500).json({ message: error.message });
});

const port = WEBSERVER_PORT || 3000;
module.exports = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(
    `\nServer running at http://localhost:${port}\n`,
    `Swagegr Documentation running at http://localhost:${port}/api-docs\n`,
    `(not available with the test environmet) API Telemetry and APM running at http://localhost:${port}/swagger-stats\n`,
  );
});
