import * as sinon from 'sinon';
import * as chai from 'chai';
const { expect } = chai;
import mapStatusHTTP from '../utils/mapStatusHTTP';


describe('Testa mapStatusHTTP', function () {
    it('test mapStatusHTTP', function() {
    const SUCCESS = mapStatusHTTP('SUCCESSFUL');
    expect(SUCCESS).to.equal(200);

    const INVALIDATA = mapStatusHTTP('INVALID_DATA');
    expect(INVALIDATA).to.equal(400);

    const NOTFOUND = mapStatusHTTP('NOT_FOUND');
    expect(NOTFOUND).to.equal(404);

    const UNAUTHORIZED = mapStatusHTTP('UNAUTHORIZED');
    expect(UNAUTHORIZED).to.equal(401);

    const CONFLICT = mapStatusHTTP('CONFLICT');
    expect(CONFLICT).to.equal(409);

    const DEFAULT = mapStatusHTTP('DEFAULT');
    expect(DEFAULT).to.equal(500);

    });

})