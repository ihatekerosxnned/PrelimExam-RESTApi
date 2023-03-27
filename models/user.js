const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
        unique: true
    },
    fullname: {
        type: String
    },
    gender: {
        type: String
    },
    address: {
        type: String
    }

})

module.exports = mongoose.model('User',userSchema)