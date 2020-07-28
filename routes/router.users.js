const express = require('express');
const userController = require('../controllers/user.controller');
const authService = require('../services/auth.services');
const router = express.Router();


module.exports = function () {

    router.post('/create-user', userController.createUser);
    router.post('/authenticate', authService.authenticate);

    return router;
}