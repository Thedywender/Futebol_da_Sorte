import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeMatches from '../database/models/SequelizeMatches';
import  { match, matchInProgress, matchesNotInProgress }  from './mocks/matchesMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota matches', () => {

    it('teste da função getAll', async function() {
        sinon.stub(SequelizeMatches, 'findAll').resolves(match as any);

        const { status, body } = await chai.request(app).get('/matches');


        expect(status).to.equal(200);
        expect(body).to.deep.equal(match);
    });

    it('teste da função getAllInProgress=true', async function() {
        sinon.stub(SequelizeMatches, 'findAll').resolves(matchInProgress as any);

        const { status, body } = await chai.request(app).get('/matches?inProgress=true');


        expect(status).to.equal(200);
        expect(body).to.deep.equal(matchInProgress);
    });

    it('Teste da função getAllInProgress=False', async function() {
        sinon.stub(SequelizeMatches, 'findAll').resolves(matchesNotInProgress as any);

        const { status, body } = await chai.request(app).get('/matches?inProgress=false');

        expect(status).to.equal(200);
        expect(body).to.deep.equal(matchesNotInProgress);
    });

    afterEach(sinon.restore);
})