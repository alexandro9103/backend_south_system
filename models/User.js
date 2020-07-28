const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    username: {
        type: String,
        unique: true,
        required: 'Você deve digitar o nome do usuario',
        lowercase: true
    },
    password: {
        type: String,
        required: 'Você deve digitar a senha',
        select: false
    },
    role: {
        type: String,
        required: 'O Rol do Usuar é obrigatorio',
        lowercase: true
    }
});

UserSchema.pre('save', function (next) {
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(this.password, salt);
    this.password = password;
    next();
});

const User = mongoose.model('user', UserSchema);

module.exports = User;