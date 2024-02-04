import { App } from "../app";
import * as sinon from 'sinon';
import * as chai from 'chai'
import { invalidEmail, userValid, validBodyLogin, noEmail, noPassword, invalidpassword } from "./mocks/user.mocks";
import Validations from "../middlewares/validations";
import * as jwt from 'jsonwebtoken'
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeUser from '../database/models/SequelizeUser';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes Login', () => {

  describe('/login', () => {
    it('Testa o retorno sem o Email', async () => {
      const {status, body} = await chai.request(app).post('/login').send({noEmail});
      expect(status).to.equal(400);
      expect(body).to.deep.equal({ message: 'All fields must be filled' })
    });

    it('Testa o retorno sem o Password', async () => {
      const {status, body} = await await chai.request(app).post('/login').send(noPassword)
      expect(status).to.equal(400);
      expect(body).to.deep.equal({ message: 'All fields must be filled' })
    });

    it('Testa o retorno com Email errado', async () => {
        const {status, body} = await await chai.request(app).post('/login').send(invalidEmail)
        expect(status).to.equal(401);
        expect(body).to.deep.equal({ message: 'Invalid email or password'})
      });

      it('Testa o retorno com a senha errada', async () => {
        const {status, body} = await await chai.request(app).post('/login').send(invalidpassword)
        expect(status).to.equal(401);
        expect(body).to.deep.equal({ message: 'Invalid email or password'})
      });

      // it('Deve retornar um token caso seja possivel fazer o login /login', async function() {
      //   sinon.stub(SequelizeUser, 'findOne').resolves(userValid as any);
      //   sinon.stub(jwt, 'sign').returns();
      //   sinon.stub(Validations, 'validateLoginFields').returns();
    
      //   const {status, body} = await chai.request(app).post('/login').send(validBodyLogin);
      //   expect(status).to.equal(200);
      // });
   
  });

  afterEach(() => {
    sinon.restore();
  });
});
