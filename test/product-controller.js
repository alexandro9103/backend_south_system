const mongoose = require('mongoose');
const { expect } = require('chai');
const Product = require('../models/Product')
const productController = require('../controllers/products.controller');

describe('Product-Controller', () => {

    it('Debe retornar um produto passando o ID do produto', async () => {
        mongoose.connect("mongodb+srv://administrador:admin@cluster0.vcenj.mongodb.net/productsdbtest?retryWrites=true&w=majority").then(resp => {

            const product = new Product({
                name: 'Doce de leite',
                price: 50,
                quantity: 250,
                _id: '5f1ecdbcb51aee2b8e9c0dd1'
            })

            return product.save();


        }).then(() => {


            const req = { params: { id: '5f1ecdbcb51aee2b8e9c0dd1' } }
            const res = {
                statusCode: 500,
                status: function (code) {
                    this.statusCode = code
                    return this;
                },
                json: function (data) {
                    return data;
                }
            }

            productController.getProduct(req, res).then(async () => {
                expect(res.statusCode).to.be.equal(200)
                await Product.deleteMany({});
                mongoose.disconnect()
            })

        })
            .catch(err => {
                console.log(err);
            })
    });

});