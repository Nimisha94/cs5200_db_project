var mongoose = require('mongoose');

var prodSchema = mongoose.Schema(
    {
        username : {type : String, unique : true},
        password : String,
        role: {type:String, default:'productionHouse'},
        productionHouseName : String,
        location : String,
        movies: [mongoose.Schema.Types.Mixed],
        mySoldItems : [mongoose.Schema.Types.Mixed]
    }, {collection : 'productionHouse'}

);

module.exports = prodSchema;