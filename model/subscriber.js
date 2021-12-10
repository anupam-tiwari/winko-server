const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    }, 
    number: {
        type: String, 
        required: true
    }, 
    subdate: {
        type: Date, 
        required: true, 
        default: Date.now
    }
})

module.exports = mongoose.model('Subscriber', subscriberSchema)