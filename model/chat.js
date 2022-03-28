const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    _id:{
        type:String,
        required: true
    },
    name:{
        type:String, 
        required:true, 
        default: "User"
    },
    data:{
        type: Array,
        required:true, 
        default:[]
    },
    date:{
        type:Date,
        required: true, 
        default: Date.now
    }
})

module.exports = mongoose.model('Chat',chatSchema)