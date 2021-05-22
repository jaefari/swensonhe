const path = require('path');
const awilix = require('awilix');
// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');

// NODE_ENV should be defined in each scripts of package.json that need it
const dotenvResult = require('dotenv').config({ path: path.join(__dirname, '..', '..', 'config', 'env', `${process.env.NODE_ENV || 'development'}.env`) });

if (dotenvResult.error) throw dotenvResult.error;

// utils
const validatorMaker = require('../utils/validatorMaker');

// mdoels
const buildMakeMachine = require('../models/machine');
const buildMakePod = require('../models/pod');
// schemas
const machineSchema = require('../models/machine/schema');
const podSchema = require('../models/pod/schema');
// fakes
const buildMakeFakeMachine = require('../models/machine/faker');
const buildMakeFakePod = require('../models/pod/faker');
// validators
const machineValidator = validatorMaker(machineSchema);
const podValidator = validatorMaker(podSchema);
// database, data-access
const { makeDb, clearDbCollection, closeDb } = require('../../src/utils/database');
const machineDataAccess = require('../data-access/machine');
const podDataAccess = require('../data-access/pod');
// use-cases
const addMachineUseCase = require('../use-cases/add-machine');
const listMachinesUseCase = require('../use-cases/list-machines');
const addPodUseCase = require('../use-cases/add-pod');
const listPodsUseCase = require('../use-cases/list-pods');


const createAContainer = () => {
  const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
  });

  container.register({
    // environment variables
    MONGO_URI: awilix.asValue(process.env.MONGO_URI),
    MONGO_DB_NAME: awilix.asValue(process.env.MONGO_DB_NAME),
    WEBSERVER_PORT: awilix.asValue(process.env.WEBSERVER_PORT),
    NODE_ENV: awilix.asValue(process.env.NODE_ENV),

    // utils
    faker: awilix.asValue(faker),

    // validators
    machineValidator: awilix.asValue(machineValidator),
    podValidator: awilix.asValue(podValidator),

    // entities
    makeMachine: awilix.asFunction(buildMakeMachine).singleton(),
    makeFakeMachine: awilix.asFunction(buildMakeFakeMachine).singleton(),
    makePod: awilix.asFunction(buildMakePod).singleton(),
    makeFakePod: awilix.asFunction(buildMakeFakePod).singleton(),

    // use-cases
    addMachineUseCase: awilix.asFunction(addMachineUseCase).singleton(),
    listMachinesUseCase: awilix.asFunction(listMachinesUseCase).singleton(),
    addPodUseCase: awilix.asFunction(addPodUseCase).singleton(),
    listPodsUseCase: awilix.asFunction(listPodsUseCase).singleton(),

    // database, data-access
    machineDataAccess: awilix.asFunction(machineDataAccess).singleton(),
    podDataAccess: awilix.asFunction(podDataAccess).singleton(),
    makeDb: awilix.asFunction(makeDb).singleton(),
    closeDb: awilix.asValue(closeDb),
    clearDbCollection: awilix.asValue(clearDbCollection),
  });

  return container;
};

const container = createAContainer();

module.exports = {
  // for test purposes create new container for each test to be able manipulate it based on test requirement
  createAContainer,
  // for real usecase you just need one container to use
  getTheContainer: () => container,
};
