const repository = require('../repository/user.repository');


exports.createUser = async (req, res) => {

    const { body } = req;

    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).json({
            message: 'Você deve digitar o nome do usuario e a senha',
            product: null
        });
    }

    try {

        const user = await repository.createUser(body);

        if (user) {
            return res.status(201).json({
                message: 'O usuario foi cadastrado com sucesso',
                user
            });
        }

        return res.status(400).json({
            message: 'O usuario não foi cadastrado',
            user: null
        });

    } catch (error) {
        res.status(500).json({
            error: error.errors,
            message: 'O usuario não foi cadastrado',
            user: null
        });
    }

}

