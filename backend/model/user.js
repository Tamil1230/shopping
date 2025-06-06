const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    password: Number
})

const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel;