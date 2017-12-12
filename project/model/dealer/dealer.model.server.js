var mongoose = require("mongoose");
var ObjectID = require('mongodb').ObjectID;
var dealerSchema = require("./dealer.schema.server");
var dealerModel = mongoose.model("DealerModel", dealerSchema);

dealerModel.createDealer = createDealer;
dealerModel.findDealerByCredentials = findDealerByCredentials;
dealerModel.findDealerById = findDealerById;
dealerModel.addToCart = addToCart;
dealerModel.addToOrder = addToOrder;
dealerModel.addToSoldItems = addToSoldItems;
dealerModel.findMovie = findMovie;
dealerModel.updateMovieQuantity = updateMovieQuantity;
dealerModel.changeOrderStatus = changeOrderStatus;

module.exports = dealerModel;

function createDealer(dealer) {
    return dealerModel.create(dealer);
}

function findDealerByCredentials(username,password) {
    return dealerModel.findOne({username:username,password:password});
}

function findDealerById(dealerId) {
    return dealerModel.findOne({_id: new ObjectID(dealerId)});
}

function addToCart(dealerId, order) {
    return dealerModel.findOneAndUpdate({_id: new ObjectID(dealerId)}, {$push: {"cart": order}});
}

function addToOrder(dealerId) {
    return dealerModel.findOne({_id: new ObjectID(dealerId)})
        .then(function (user) {
            var order={
                id: user.myPurchases.length,
                items: user.cart,
                status: 'Order placed'
            };
            return dealerModel.findOneAndUpdate({_id: new ObjectID(dealerId)}, {$push: {"myPurchases": order}})
                .then(function (res) {
                    return dealerModel.update({_id: new ObjectID(dealerId)}, {$set: {"cart": []}});
                });
        });
}

function addToSoldItems(dealerId, item) {
    return dealerModel.findOneAndUpdate({_id: new ObjectID(dealerId)}, {$push: {"mySoldItems": item}});
}

function findMovie(movieId) {
    return dealerModel.find()
        .then(function (dealers) {
            var d = [];
            console.log(dealers);
            for(var i=0;i<dealers.length;i++){
                for(var j=0;j<dealers[i].movies.length;j++){
                    if(movieId===dealers[i].movies[j].Id){
                        var m={
                            dealerId: dealers[i]._id,
                            dealer: dealers[i].dealerName,
                            quant: dealers[i].movies[j].quantity,
                            cost: dealers[i].movies[j].cost
                        };
                        d.push(m);
                    }

                }

            }
            return d;
        });
}

function updateMovieQuantity(dealerId, movieId, quantity) {
    return dealerModel.findOne({'_id': new ObjectID(dealerId), 'movies.Id': movieId})
        .then(function (dealer) {
            var q = 0;
            for(var i=0;i<dealer.movies.length;i++){
                if(movieId === dealer.movies[i].Id){
                    q = dealer.movies[i].quantity;
                }
            }
            return dealerModel.findOneAndUpdate({'_id': new ObjectID(dealerId), 'movies.Id': movieId}, {$set: {'movies.$.quantity': q-quantity}});
        });

}

function changeOrderStatus(dealerId, orderId) {
    return dealerModel.findOneAndUpdate({'_id': new ObjectID(dealerId), 'myPurchases.id': orderId},{$set: {'myPurchases.$.status': 'Delivered'}})
        .then(function (res) {
            var mov = [];
            return dealerModel.find({'_id': new ObjectID(dealerId), 'myPurchases.id': orderId}, {myPurchases:1})
                .then(function (orders) {
                    for(var i=0;i<orders.length;i++){
                        for(var k=0;k<orders[i].items.length;k++){
                            var o={
                                Id: orders[i].items[k].movie.id,
                                quantity: orders[i].items[k].quantity,
                                cost: orders[i].items[k].productionHouse.cost + (orders[i].items[k].productionHouse.cost * 20/100)
                            };
                            mov.push(o);
                            //dealers[i].movies.push(o);
                        }
                    }
                    return dealerModel.update({'_id': new ObjectID(dealerId), 'myPurchases.id': orderId}, {$set: {$pushAll: {movies: o}}});
                });
        })
    /*return dealerModel.findOneAndUpdate({'_id': new ObjectID(dealerId), 'myPurchases.id': orderId},{$set: {'myPurchases.$.status': 'Delivered'}})
    .then(function (response) {
        return dealerModel.findOne({'_id': new ObjectID(dealerId), 'myPurchases.id': orderId})
            .then(function (dealer) {
                var orders = dealer.myPurchases;
                for(var i=0; i<orders.length;i++){

                }
            })
    })*/
}