import { App } from "../app";
import * as sinon from 'sinon';
import * as chai from 'chai'
import { invalidEmail, userValid, validBodyLogin, noEmail, noPassword, 
  invalidpassword, userReturnCall, invalidEmailPasswordMess, userInvalid, inválidfields, token } from "./mocks/user.mocks";

// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeUser from '../database/models/SequelizeUser';
import UserModel from "../models/userModel";
import * as bcrypt from 'bcryptjs';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes Login', () => {

  describe('/login', () => {

    it('Testa o retorno caso não envie nenhuma informação', async () => {
      const {status, body} = await await chai.request(app).post('/login').send()
      expect(status).to.equal(400);
      expect(body).to.deep.equal(inválidfields);
    });

    it('Testa o retorno sem o Email', async () => {
      const {status, body} = await chai.request(app).post('/login').send({noEmail});
      expect(status).to.equal(400);
      expect(body).to.deep.equal(inválidfields)
    });

    it('Testa o retorno sem o Password', async () => {
      const {status, body} = await await chai.request(app).post('/login').send(noPassword)
      expect(status).to.equal(400);
      expect(body).to.deep.equal(inválidfields)
    });

    it('Testa o retorno com Email errado', async () => {
        const {status, body} = await await chai.request(app).post('/login').send(invalidEmail)
        expect(status).to.equal(401);
        expect(body).to.deep.equal(invalidEmailPasswordMess)
      });

      it('Testa o retorno com a senha errada', async () => {
        const {status, body} = await await chai.request(app).post('/login').send(invalidpassword)
        expect(status).to.equal(401);
        expect(body).to.deep.equal(invalidEmailPasswordMess)
      });

      it('Testa se retorna uma chave Token', async () => {
        sinon.stub(SequelizeUser, 'findOne').resolves(userReturnCall as SequelizeUser);
        sinon.stub(bcrypt, 'compareSync').returns(true);

        const {status, body} = await await chai.request(app).post('/login').send(validBodyLogin)
        expect(status).to.equal(200);
        expect(body).to.have.keys('token');
      });

      it('Testa se nãoretorna uma chave Token válida', async () => {
        sinon.stub(SequelizeUser, 'findOne').resolves(userReturnCall as SequelizeUser);
        sinon.stub(bcrypt, 'compareSync').returns(false);

        const {status, body} = await await chai.request(app).post('/login').send(userInvalid)
        expect(status).to.equal(401);
        expect(body).to.deep.equal(invalidEmailPasswordMess);
      });

      it('Testa o retorno de um token inválido', async function() {
        const { status, body } = await chai.request(app).get('/login/role').set('Authorization', token);
    
        expect(status).to.equal(401);
        expect(body).to.deep.equal({ message: 'Token must be a valid token' });
      });
   
  });

  afterEach(() => {
    sinon.restore();
  });
});
