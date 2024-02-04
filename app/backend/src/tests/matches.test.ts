import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeMatches from '../database/models/SequelizeMatches';
import  { 
    invalidTokenMessage,
    match,
    matchBodyInsert,
    matchErrorToken, 
    matchInProgress, matchNotFoundToken, matchValidToken, matchesNotInProgress, newErrorMatchBody, newMatch, newMatchBody }  from './mocks/matchesMocks';

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

    it('Teste da função updateMatchFinish sem um token válido', async function() {
        sinon.stub(SequelizeMatches, 'findByPk').resolves(match as any);
        sinon.stub(SequelizeMatches, 'update').resolves(undefined);

        const { status, body } = await chai.request(app)
        .patch('/matches/2/finish').set('Authorization', matchErrorToken)

        expect(status).to.equal(401);
        expect(body).to.deep.equal(invalidTokenMessage);
    });

    it('Teste da função updateMatchFinish com um token válido', async function() {
        sinon.stub(SequelizeMatches, 'findByPk').resolves(match as any);
        sinon.stub(SequelizeMatches, 'update').resolves(undefined);

        const { status, body } = await chai.request(app)
        .patch('/matches/2/finish').set('Authorization', matchValidToken)

        expect(status).to.equal(401);
        expect(body).to.deep.equal(invalidTokenMessage);
    });

    // it('testa se retorna um erro caso não encontre um matchFinish', async function() {
    //     sinon.stub(SequelizeMatches, 'findByPk').resolves();
    
    //     const { status, body } = await chai.request(app)
    //     .patch('/matches/1/finish')
    //     .set('Authorization', matchValidToken);
    
    //     expect(status).to.equal(401);
    //     expect(body).to.deep.equal(invalidTokenMessage);
    //   });

      it('testa se retorna um erro caso não encontrar token', async function() {
        sinon.stub(SequelizeMatches, 'findByPk').resolves();
    
        const { status, body } = await chai.request(app)
        .patch('/matches/2')
        .set('Authorization', matchValidToken);
    
        expect(status).to.equal(401);
        expect(body).to.deep.equal(matchNotFoundToken);
      });

      it('testa se não encontra um matchById ', async function() {
        sinon.stub(SequelizeMatches, 'findByPk').resolves(newErrorMatchBody as any);
    
    
        const { status, body } = await chai.request(app)
        .post('/matches/2').send(matchBodyInsert).set('Authorization', matchValidToken);
    
        expect(status).to.equal(404);
        expect(body).to.deep.equal({});
      });

    //   it('Deve criar um match', async function() {
    //     sinon.stub(SequelizeMatches, 'create').resolves(newMatch as any);
    
    //     sinon.stub(SequelizeMatches, 'update').resolves(undefined);
    
    //     const { status, body } = await chai.request(app)
    //     .post('/matches')
    //     .send(newMatchBody)
    //     .set('Authorization', matchValidToken);
    
    //     expect(body).to.deep.equal(match);
    //     expect(status).to.equal(201);
    //   });

    //   it('Testa se retorna um erro tentando criar uma partida com time inválido', async function() {
    //     const { status, body } = await chai.request(app)
    //     .post('/matches')
    //     .send(newErrorMatchBody)
    //     .set('Authorization', matchValidToken);
    
    //     expect(status).to.equal(401);
    //     expect(body).to.deep.equal({ "message": "It is not possible to create a match with two equal teams" });
    //   });

    afterEach(sinon.restore);
})

// case 'SUCCESSFUL': return 200;
// case 'CREATED': return 201;
// case 'INVALID_DATA': return 400;
// case 'NOT_FOUND': return 404;
// case 'CONFLICT': return 409;
// case 'UNAUTHORIZED': return 401;
// default: return 