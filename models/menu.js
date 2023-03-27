const { text } = require('express')
const mongoose = require('mongoose')


const menuSchema = new mongoose.Schema({

    category:{
        type:String
    },
    prodname:{
        type:String
    },
    description: {
        type: String
    },
    amount: {
        type: String
    },
    restaurantid: {
        type: String
    }

})

module.exports = mongoose.model('Menu',menuSchema)