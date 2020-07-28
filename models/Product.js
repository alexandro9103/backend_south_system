const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: 'Você deve digitar o nome do produto',
        trim: true,
        unique:true
    },
    price: {
        type: Number,
        required: 'Você deve digitar o preço do produto'
    },
    quantity: {
        type: Number,
        required: 'Você deve digitar a quantidade do produto'
    }

});

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;