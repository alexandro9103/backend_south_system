const express = require('express');
const productsController = require('../controllers/products.controller');

const { isAuthenticated, isAdmin } = require('../middlewares/auth');
const router = express.Router();


module.exports = function () {

    router.post('/create-product', [isAuthenticated, isAdmin], productsController.createProduct);
    router.put('/update-product/:id',[isAuthenticated, isAdmin], productsController.updateProduct);
    router.delete('/delete-product/:id',[isAuthenticated, isAdmin], productsController.deleteProduct);
    router.get('/get-products/:from?/:limit?', productsController.getProducts);
    router.get('/find-products/:name?/:from?/:limit?', productsController.findProduct);
    router.get('/get-product/:id', productsController.getProduct);

    return router;
}