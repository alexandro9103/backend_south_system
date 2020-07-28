const bcrypt = require('bcryptjs');
const repository = require('../repository/auth.repository');

exports.authenticate = async (req, res) => {

    const { body } = req;

    const user = await repository.authenticate(body);

    if (!user) {
        return res.status(401).json({
            message: 'O usuario não existe',
            token: null
        });
    } else {
        if (!bcrypt.compareSync(body.password, user.password)) {
            return res.json({
                message: 'A senha digitada é incorreta',
                token: null,
            });
        } else {
            const payload = {
                username: user.username,
                role: user.role
            };
            const token = repository.generateToken(payload);
            return res.json({
                token,
                user: payload
            })
        }
    }

}