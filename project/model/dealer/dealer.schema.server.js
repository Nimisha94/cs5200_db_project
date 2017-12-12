var mongoose = require('mongoose');

var dealerSchema = mongoose.Schema(
    {
        username : {type : String, unique : true},
        password : String,
        role: {type:String, default:'dealer'},
        dealerName : String,
        dealerLocation : String,
        movies: [mongoose.Schema.Types.Mixed],
        cart: [mongoose.Schema.Types.Mixed],
        myPurchases : [mongoose.Schema.Types.Mixed],
        mySoldItems : [mongoose.Schema.Types.Mixed],
    }, {collection : 'dealer'}

);

module.exports = dealerSchema;