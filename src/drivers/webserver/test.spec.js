/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const supertest = require('supertest');

const container = require('../../container').getTheContainer();

const app = require('./index');

const request = supertest.agent(app);
const { makeFakeMachine, makeFakePod } = container.cradle;

describe('webserver endpoints', () => {
  after(() => {
    // shut down the Express.js server
    app.close();
  });

  describe('machine', () => {
    it('should allow a POST to /machines', async () => {
      const machine = makeFakeMachine();
      const res = await request.post('/machines').send(machine);

      expect(res.status).to.equal(201);
      expect(res.body.data).to.be.an('object');
    });

    it('should allow a GET to /machines', async () => {
      const res = await request.get('/machines');

      expect(res.status).to.equal(200);
      expect(res.body.data).to.be.an('object');
    });
  });

  describe('pod', () => {
    it('should allow a POST to /pods', async () => {
      const pod = makeFakePod();
      const res = await request.post('/pods').send(pod);

      expect(res.status).to.equal(201);
      expect(res.body.data).to.be.an('object');
    });

    it('should allow a GET to /pods', async () => {
      const res = await request.get('/pods');

      expect(res.status).to.equal(200);
      expect(res.body.data).to.be.an('object');
    });
  });
});
