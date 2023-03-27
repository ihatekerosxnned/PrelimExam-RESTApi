const mongoose = require('mongoose')


const transactionSchema = new mongoose.Schema({

    userid:{
        type:String
    },
    riderid:{
        type:String
    },
    restaurantid:{
        type:String
    },
    menuid: {
        type: String
    },
    total: {
        type: String
    },
    trans_date: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Transaction',transactionSchema)