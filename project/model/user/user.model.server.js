var mongoose = require("mongoose");
var ObjectID = require('mongodb').ObjectID;
var userSchema = require("./user.schema.server");
var userModel = mongoose.model("UserModel", userSchema);


userModel.createUser = createUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserById = findUserById;
userModel.addToCart = addToCart;
userModel.addToOrder = addToOrder;
userModel.changeOrderStatus = changeOrderStatus;

module.exports = userModel;

function createUser(user) {
    return userModel.create(user);
}

function findUserByCredentials(username,password) {
    return userModel.findOne({username:username,password:password});
}

function findUserById(userId) {
    return userModel.findOne({_id: new ObjectID(userId)});
}

function addToCart(userId, order) {
    return userModel.findOneAndUpdate({_id: new ObjectID(userId)}, {$push: {"cart": order}});
}

function addToOrder(userId) {
    return userModel.findOne({_id: new ObjectID(userId)})
        .then(function (user) {
            var order={
                id: user.myOrders.length,
                items: user.cart,
                status: 'Order placed'
            };
            return userModel.findOneAndUpdate({_id: new ObjectID(userId)}, {$push: {"myOrders": order}})
                .then(function (res) {
                    return userModel.update({_id: new ObjectID(userId)}, {$set: {"cart": []}});
                });
        });
}

function changeOrderStatus(userId, orderId) {
    return userModel.findOneAndUpdate({'_id': new ObjectID(userId), 'myOrders.id': orderId},{$set: {'myOrders.$.status': 'Delivered'}});
    /*return userModel.findOne({_id: new ObjectID(userId)})
        .then(function (user) {
            var orders = user.myOrders;
            for(var i=0;i<orders.length;i++){
                if(orderId===orders[j].id){
                    orders[j].status="Delivered";
                }
            }
        })*/
}