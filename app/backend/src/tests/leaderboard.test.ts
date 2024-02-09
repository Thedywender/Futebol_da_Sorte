import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { leaderboardListAll, leaderboardListAway, leaderboardListHome } from './mocks/leaderboard.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando leaderboards Home', () => {
    it('testando o retorno da lista de leaderboard home', async function() {
        const { status, body } = await chai.request(app).get('/leaderboard/home');

        expect(status).to.equal(200);
        expect(body).to.deep.equal(leaderboardListHome);
    })

    it('Testando leaderboards away', async () => {
        const { status, body } = await chai.request(app).get('/leaderboard/away');

        expect(status).to.equal(200);
        expect(body).to.deep.equal(leaderboardListAway);
    })

    it('Testando leaderboard getAll', async function() {
        const { status, body } = await chai.request(app).get('/leaderboard');

        expect(status).to.equal(200);
        expect(body).to.deep.equal(leaderboardListAll);
    })
})