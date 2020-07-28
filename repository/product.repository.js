
const Product = require('../models/Product');


exports.createProduct = async (product) => {
    const prod = await Product.create(product);
    return prod;
}

exports.updateProduct = async (id, product) => {
    const prod = await Product.findByIdAndUpdate(id, product, { new: true });
    return prod;
}


exports.deleteProduct = async (id) => {
    const product = await Product.findByIdAndRemove(id);
    return product;
}

exports.getProducts = async (from, limit) => {
    const products = await Product.find({}).skip(parseInt(from)).limit(parseInt(limit));
    return products;
}

exports.findProduct = async (name, from, limit) => {
    const products = await Product.find({ name: { $regex: `${name}`, $options: 'i' } }).skip(parseInt(from)).limit(parseInt(limit));
    return products;
}

exports.getProduct = async (id) => {
    const product = await Product.findById(id);
    return product;
}