const jwt = require('jsonwebtoken');
const repository = require('../repository/auth.repository');
exports.isAuthenticated = (req, res, next) => {

    const token = req.get('token');

    if (!token) {
        return res.status(401).json({
            message: 'Acesso restrito',
            token: null
        });
    }
    try {
        const decodedToken = repository.verifyToken(token);
        req.user = decodedToken;
        next();

    } catch (error) {
        res.status(401).json({
            message: 'Token Inválido',
            token: null
        });
    }
}

exports.isAdmin = (req, res, next) => {

    const { user } = req;

    if (user.role === 'admin') {
        next();
    } else {
        return res.status(401).json({
            message: 'você não tem permisos administrativos'
        })
    }

}