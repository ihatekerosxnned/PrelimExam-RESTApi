const mongoose = require('mongoose')


const restaurantSchema = new mongoose.Schema({

    name:{
        type:String
    },
    location:{
        type:String
    },
    owner_name: {
        type: String
    }

})

module.exports = mongoose.model('Restaurant',restaurantSchema)