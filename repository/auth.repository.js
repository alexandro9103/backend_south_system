const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticate = async ({ username }) => {
    try {
        const user = await User.findOne({ username }).select('+password');
        return user;
    } catch (error) {
        return error;
    }
}

exports.generateToken = (payload) => {
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' })
    return token;
}

exports.verifyToken = token => {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    return decodedToken;
}