const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'This username is not available'],
        min: [6, 'The username needs to be at least 6 characters long'],
        max: [20, 'The username must be under 20 characters long'],
        required: [true, 'User must have a name']
    },
    email: {
        type: String,
        unique: [true, 'This username is already has been taken'],
        max: [50, 'The email must be under 50 characters long'],
        required: [true, 'User must have an email']
    },
    password: {
        type: String,
        required: [true, 'User must have a password'],
        min: [6, 'Password too short - it has to be at least 6 characters long'],
        max: [20, 'Password too long - it has to be under 20 characters long']

    },
    profilePicture: {
        type: String,
        default: ""
    }
},
    {timestamps: true}
)

const UserModel = mongoose.model('User', UserSchema)
module.exports = UserModel