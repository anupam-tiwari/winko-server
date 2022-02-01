const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
    _id:{
        type: String, 
        required: true
    }, 
    name: {
        type: String,
        required: true, 
        default: "User"
    }, 
    number: {
        type: String, 
        required: true
    }, 
    subdate: {
        type: Date, 
        required: true, 
        default: Date.now
    }, 
    location: {
        type: String, 
        required: true, 
        default: "USA"
    }
})

module.exports = mongoose.model('Subscriber', subscriberSchema)