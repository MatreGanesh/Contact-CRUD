const mongoose = require('mongoose');

const signUpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  // Corrected "require" to "required"
    },
    email: {
        type: String,
        unique: true,
        required: true,  // Corrected "require" to "required"
    },
    password: {
        type: String,
        required: true,  // Corrected "require" to "required"
    }
})


module.exports = mongoose.model('SignUp', signUpSchema)