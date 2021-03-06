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
dealerModel.addMovies = addMovies;
dealerModel.findAllDealers = findAllDealers;
dealerModel.deleteDealer = deleteDealer;
dealerModel.updateDealer = updateDealer;
dealerModel.changeSoldItemsOrder = changeSoldItemsOrder;

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
    return dealerModel.findOneAndUpdate({'_id': new ObjectID(dealerId), 'myPurchases.id': orderId},{$set: {'myPurchases.$.status': 'Delivered'}});
    /*    .then(function (res) {
            var mov = [];
            return dealerModel.findOne({'_id': new ObjectID(dealerId), 'myPurchases.id': orderId})
                .then(function (dealer) {
                    var orders = dealer.myPurchases;
                    var movies = dealer.movies;
                    for(var i=0;i<orders.length;i++) {
                        if (orderId === orders[i].id) {
                            for (var k = 0; k < orders[i].items.length; k++) {
                                var o = {
                                    Id: orders[i].items[k].movie.id,
                                    quantity: orders[i].items[k].quantity,
                                    cost: orders[i].items[k].productionHouse.cost + (orders[i].items[k].productionHouse.cost * 20 / 100)
                                };
                                mov.push(o);
                                //dealers[i].movies.push(o);
                            }
                        }
                    }
                    return dealerModel.update({'_id': new ObjectID(dealerId)}, {$push: {movies: {$each: mov}}});
                });
        })*/
}

function addMovies(dealerId, movie) {
    return dealerModel.findOne({'_id': new ObjectID(dealerId)})
        .then(function (dealer) {
            var flag = 0;
            var movies = dealer.movies;
            for(var i=0;i<movies.length;i++){
                if(movie.Id===movies[i].Id){
                    flag = 1;
                    var q = movies[i].quantity;
                    return dealerModel.findOneAndUpdate({'_id': new ObjectID(dealerId), 'movies.Id': movie.Id}, {$set: {'movies.$.quantity': q+movie.quantity}});
                }
            }
            if(flag===0){
                return dealerModel.update({'_id': new ObjectID(dealerId)}, {$push: {movies: movie}});
            }
        });
}

function findAllDealers() {
    return dealerModel.find();
}

function deleteDealer(dealerId) {
    return dealerModel.remove({_id: new ObjectID(dealerId)});
}

function updateDealer(dealerId, dealer) {
    return dealerModel.update({_id: new ObjectID(dealerId)}, {$set: dealer});
}

function changeSoldItemsOrder(dealerId, userId, orderId) {
    return dealerModel.findOneAndUpdate({'_id': new ObjectID(dealerId), 'mySoldItems.orderId': orderId, 'mySoldItems.userId': userId},{$set: {'mySoldItems.$.status': 'Delivered'}});
}