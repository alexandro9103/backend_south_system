const User = require('../models/User');

exports.createUser = async (user) => {

    const resp = await User.create(user);
    return resp;

}
