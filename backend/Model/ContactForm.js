const mongoose = require('mongoose');

const ContactFormSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    contact: {
        type: Number,
        unique: true
    }
})

module.exports = mongoose.model('ContactForm', ContactFormSchema);