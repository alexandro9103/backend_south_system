const { expect } = require('chai');
const { isAuthenticated } = require('../middlewares/auth');
const jwt = require('jsonwebtoken');

describe('Auth Middleware', () => {

    it('lança um erro se um token não é fornecido', () => {

        const req = {
            get: () => {
                return null
            }
        }
        const res = {
            status: (status) => {

                return {
                    status,
                    json: (data) => {
                        return data
                    }
                }
            }
        }


        expect(isAuthenticated(req, res, () => { })).to.deep.equal({ message: 'Acesso restrito', token: null });


    });

    it('Adiciona o usuario ao request depois de verificar o Token', () => {

        const req = {
            get: (headerName) => {

                return "sdasdsdsadsad"
            }
        }
        const res = {
            status: (status) => {
                return {
                    status,
                    json: (data) => {
                        return data
                    }
                }
            }
        }

        jwt.verify = () => {
            return {
                user: { username: 'alexandro', password: 'qaz' }
            }
        }

        isAuthenticated(req, res, () => { });
        expect(req).to.have.property('user');

    });

});

