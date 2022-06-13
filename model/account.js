const mongoose = require('mongoose')

const AccountSchema = new mongoose.Schema({
    _id:{
        type:String,
        required: true
    },
    name:{
        type:String, 
        required:true, 
        default: "User"
    },
    balance:{
        type: String,
        required:true, 
        default:"0"
    },
    date:{
        type:Date,
        required: true, 
        default: Date.now
    }
})

module.exports = mongoose.model('Account',AccountSchema)