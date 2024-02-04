import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { leaderboardList } from './mocks/leaderboard.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testano leaderboards', () => {
    it('testando o retorno da lista de leaderboard home', async function() {
        const { status, body } = await chai.request(app).get('/leaderboard/home');

        expect(status).to.equal(200);
        expect(body).to.deep.equal(leaderboardList);
    })
})