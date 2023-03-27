const mongoose = require('mongoose')


const riderSchema = new mongoose.Schema({

    first_name:{
        type:String
    },
    last_name:{
        type:String
    },
    gender:{
        type:String
    },
    age: {
        type: String
    },
    datecreated: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Rider',riderSchema)