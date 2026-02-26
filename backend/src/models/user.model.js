const mongoose = require('mongoose')

const UserScheme = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "fullname required"]
    },
    username: {
        type: String,
        required: [true, "username required"],
        unique: [true, "username is unique"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email is unique"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
        select: false,
    },
    bio: {
        type: String,
    },
}, {timestamps: true})

const Usermodel = mongoose.model('User',UserScheme)

module.exports = Usermodel