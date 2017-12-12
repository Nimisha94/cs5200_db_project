var mongoose = require('mongoose');

var userSchema = mongoose.Schema(
    {
        username : {type : String, unique : true},
        password : String,
        role: {type:String, default:'user'},
        firstName : String,
        lastName : String,
        address : String,
        cart: [mongoose.Schema.Types.Mixed],
        myOrders : [mongoose.Schema.Types.Mixed]
    }, {collection : 'user'}

);

module.exports = userSchema;