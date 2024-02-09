import { App } from "../app";
import * as sinon from 'sinon';
import * as chai from 'chai'
import * as jwt from 'jsonwebtoken';
import { before } from 'mocha';
import { validBodyLogin, noEmail,
  invalidpassword, userReturnCall, invalidEmailPasswordMess, userInvalid,
   inválidfields, invalidToken, validToken, noToken, invalidEmail, noPassword } from "./mocks/user.mocks";

// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeUser from '../database/models/SequelizeUser';
import * as bcrypt from 'bcryptjs';
import { statSync } from "fs";

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes Login', () => {
  let app: Express.Application;

  before(() => {
    const { app: server } = new App();
    app = server;
  });

  afterEach(() => {
    sinon.restore();
  })

  describe('/login', () => {
    beforeEach(() => {
      sinon.restore();
    });

    it('Testa o retorno caso não envie nenhuma informação', async () => {
      const {status, body} = await chai.request(app).post('/login').send()
      expect(status).to.equal(400);
      expect(body).to.deep.equal(inválidfields);
    });

    it('Testa o retorno sem o Email', async () => {
      const {status, body} = await chai.request(app).post('/login').send(noEmail || noPassword);
      expect(status).to.equal(400);
      expect(body).to.deep.equal(inválidfields)
    });

      it('Testa o retorno com a senha errada', async () => {
        const {status, body} = await chai.request(app).post('/login').send(invalidEmail || invalidpassword)
        expect(status).to.equal(401);
        expect(body).to.deep.equal(invalidEmailPasswordMess)
      });

      it('Testa se retorna uma chave Token', async () => {
        sinon.stub(SequelizeUser, 'findOne').resolves(userReturnCall as SequelizeUser);
        sinon.stub(bcrypt, 'compareSync').returns(true);

        const {status, body} = await chai.request(app).post('/login').send(validBodyLogin);

        expect(status).to.equal(200);
        expect(body).to.have.keys('token');
      });

      it('Testa se nãoretorna uma chave Token válida', async () => {
        sinon.stub(SequelizeUser, 'findOne').resolves(userReturnCall as SequelizeUser);
        sinon.stub(bcrypt, 'compareSync').returns(false);

        const {status, body} = await chai.request(app).post('/login').send(userInvalid);

        expect(status).to.equal(401);
        expect(body).to.deep.equal(invalidEmailPasswordMess);
      });

      it('Testa o retorno de um token inválido', async function() {
        const { status, body } = await chai.request(app).get('/login/role').set('Authorization', invalidToken);
    
        expect(status).to.equal(401);
        expect(body).to.deep.equal({ message: 'Token must be a valid token' });
      });

      it('Testa o retorno de um token válido', async function() {
        sinon.stub(jwt, 'verify').callsFake(() => ({ role: 'admin' }));
        const { status, body } = await chai.request(app).get('/login/role').set('Authorization', validToken);
    
        expect(status).to.equal(200);
        expect(body).to.deep.equal({ role: 'admin' });
      });

      it('Testa o retorno sem enviar um token', async () => {
        const { status, body } = await chai.request(app).get('/login/role').set('Authorization', '');

        expect(status).to.equal(401);
        expect(body).to.deep.equal(noToken);
      });


   
  });

  describe('Testa a chamada da porta', () => {
    it('Testa a chamada da porta 3000', async function() {
      const PORT = 3000;
      const app = new App();

      const listenPort = sinon.stub(app.app, 'listen');

      app.start(PORT);

      expect(listenPort.calledOnceWith(PORT)).to.be.true;

      listenPort.restore();
    })
  })

});
