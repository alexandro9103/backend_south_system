
const repository = require('../repository/product.repository');

exports.createProduct = async (req, res) => {
    const { body } = req;

    const { name, quantity, price } = req.body;


    if (!name || !quantity || !price) {
        return res.status(400).json({
            message: 'Você deve digitar preencher todos os dados',
            product: null
        });
    }

    try {

        const prod = await repository.createProduct(body);
        if (prod) {
            return res.status(201).json({
                message: 'O produto foi cadastrado com sucesso',
                product: prod
            });
        }

        return res.status(400).json({
            message: 'O produto não foi cadastrado',
            product: null
        })


    } catch (error) {
        res.status(500).json({
            error: error.errors,
            message: 'O produto não foi cadastrado',
            product: null
        });
    }
}

exports.updateProduct = async (req, res) => {
    const { body } = req;
    const { id } = req.params;
    const { name, quantity, price } = req.body;

    if (!name || !quantity || !price) {
        return res.status(400).json({
            message: 'Você deve digitar preencher todos os dados',
            product: null
        });
    }

    try {
        const product = await repository.updateProduct(id, body);
        if (product) {
            return res.json({
                product,
                message: 'O produto foi atualizado com sucesso',
            });
        }

        return res.json({
            message: 'O produto não foi atualizado',
            product: null,
        })


    } catch (error) {
        res.status(500).json({
            error: error,
            message: 'O produto não foi atualizado',
            product: null,
        })
    }
}

exports.deleteProduct = async (req, res) => {

    const { id } = req.params;

    try {
        const product = await repository.deleteProduct(id);
        if (product) {
            return res.json({
                product,
                message: 'O produto foi removido com sucesso'
            })
        }

        return res.status(500).json({
            message: 'O produto não existe',
            product: null
        })

    } catch (error) {
        return res.status(500).json({
            error,
            product: null
        })
    }
}

exports.getProducts = async (req, res) => {

    let { from, limit } = req.params;

    !from && (from = 0);
    !limit && (limit = 5);

    try {
        const products = await repository.getProducts(from, limit);
        const total = await repository.getProducts(from = null, limit = null);

        return res.json({
            products,
            total: total.length
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}


exports.findProduct = async (req, res) => {

    let { name, from, limit } = req.params;

    !from && (from = 0);
    !limit && (limit = 5);

    try {
        const products = await repository.findProduct(name, from, limit);
        const total = await repository.findProduct(name, from = null, limit = null);

        if (products) {
            return res.json({
                products,
                total: total.length
            })
        }

    } catch (error) {
        res.status(500).json({
            error
        })

    }
}

exports.getProduct = async (req, res) => {

    const { id } = req.params;

    try {

        const product = await repository.getProduct(id);


        if (product) {
            return res.status(200).json({
                product
            });
        }

        return res.status(400).json({
            message: 'O produto não existe',
            product: null
        })
    } catch (error) {
        return res.status(400).json({
            //error,
            message: 'O produto não existe',
            product: null
        })
    }




}