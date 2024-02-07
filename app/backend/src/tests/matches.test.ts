import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import { ServiceResponse } from '../Interfaces/serviceResponse';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeMatches from '../database/models/SequelizeMatches';
import  { 
    invalidTokenMessage,
    match,
    matchBodyInsert,
    matchErrorToken, 
    matchInProgress, matchNotFoundToken, matchValidToken, matchesInProgressFalse, messageErrorCreate, messageFinished, newErrorMatchBody, newMatch, newMatchBody, teamsGoalsUpdated }  from './mocks/matchesMocks';
import TeamService from '../services/teamService';
import MatchesService from '../services/matchesService';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota matches', () => {

    beforeEach(() => {
        sinon.restore();
    });

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
        sinon.stub(SequelizeMatches, 'findAll').resolves(matchesInProgressFalse as any);

        const { status, body } = await chai.request(app).get('/matches?inProgress=false');

        expect(status).to.equal(200);
        expect(body).to.deep.equal(matchesInProgressFalse);
    });

    it('Teste da função updateMatchFinish com um token válido', async function() {
        sinon.stub(SequelizeMatches, 'findByPk').resolves(match as any);
        sinon.stub(SequelizeMatches, 'update').resolves(undefined);

        const { status, body } = await chai.request(app)
        .patch('/matches/2/finish').set('Authorization', matchValidToken)

        expect(status).to.equal(401);
        expect(body).to.deep.equal(invalidTokenMessage);
    });

      it('Testa o validate Teams', async function() {
        sinon.stub(TeamService.prototype, 'getTeamsById').resolves(undefined);
        sinon.stub(jwt, 'verify');

        const body = {
            homeTeamId: 1,
            awayTeamId: 1,
        }

        const response = await chai.request(app).post('/matches').send(body).set('Authorization', matchValidToken);
        expect(response.status).to.be.equal(422);
        expect(response.body).to.deep.equal({message: 'It is not possible to create a match with two equal teams'});

      })

      it('Testa o validate Teams retorno de notFound', async function() {

        sinon.stub(TeamService.prototype, 'getTeamsById').resolves({
            status: 'NOT_FOUND',
            data: { message: ''}
        });
        sinon.stub(jwt, 'verify');

        const body = {
            homeTeamId: 2,
            awayTeamId: 1,
        }

        const response = await chai.request(app).post('/matches').send(body).set('Authorization', matchValidToken);
        expect(response.status).to.be.equal(404);
        expect(response.body).to.deep.equal({ message: 'There is no team with such id!' });
      });

      it('Deve criar um match', async function() {
        sinon.stub(SequelizeMatches, 'create').resolves(newMatch as SequelizeMatches);
        sinon.stub(jwt, 'verify');
    
    
        const { status, body } = await chai.request(app)
        .post('/matches')
        .send(newMatchBody)
        .set('Authorization', matchValidToken);
    
        expect(body).to.deep.equal(match);
        expect(status).to.equal(201);
      });

      it('Testa se retorna um erro tentando criar uma partida com time inválido', async function() {
        sinon.stub(SequelizeMatches, 'create').resolves(messageErrorCreate as any);
        sinon.stub(jwt, 'verify');
        const { status, body } = await chai.request(app)
            .post('/matches')
            .set('Authorization', matchValidToken)
            .send(newErrorMatchBody);
    
        expect(status).to.equal(404);
        expect(body).to.deep.equal(messageErrorCreate);
      });

      it('deve finalizar um partida', async () => {
        sinon.stub(SequelizeMatches, 'update').resolves(messageFinished as any);
        sinon.stub(jwt, 'verify');
        const { status, body } = await chai.request(app).patch('/matches/1/finish').set('Authorization', matchValidToken).send();

        expect(status).to.equal(200);
        expect(body).to.deep.equal(messageFinished);
    });

    it('Testa se é possivel atualizar uma partida', async function() {
        sinon.stub(SequelizeMatches, 'update').resolves({ message: 'ok'} as any);
        sinon.stub(jwt, 'verify');

        const { status, body } = await chai.request(app).patch('/matches/1').set('Authorization', matchValidToken).send(teamsGoalsUpdated);

        expect(status).to.equal(200);
        expect(body).to.deep.equal({message: 'ok'});
    })
    

    afterEach(sinon.restore);
});

// case 'SUCCESSFUL': return 200;
// case 'CREATED': return 201;
// case 'INVALID_DATA': return 400;
// case 'NOT_FOUND': return 404;
// case 'CONFLICT': return 409;
// case 'UNAUTHORIZED': return 401;
// default: return 


/* mocks req, res;
//         const req = {
//             body:{
//             homeTeamId: 1,
//             awayTeamId: 1,
//         }
// }

        // const res  = {
        //     status: sinon.stub(),
        //     json: sinon.stub(),
        // };*/