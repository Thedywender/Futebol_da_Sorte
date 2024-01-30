import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeTeam from '../database/models/SequelizeTeam';
import { team, teams } from './mocks/teamMocks'
// import Example from '../database/models/ExampleModel';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste rota teams', () => {
 
  it('Test a função getAll', async function()  {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });

  it('Test a função getById', async function()  {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(team as any);

    const { status, body } = await chai.request(app).get('/teams/2');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(team);
  });

  it('Test a função getById retorna null', async function()  {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/99999');

    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: 'Team 99999 not found'});
  });

  

  afterEach(sinon.restore);
});
