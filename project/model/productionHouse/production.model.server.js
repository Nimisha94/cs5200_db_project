var mongoose = require("mongoose");
var ObjectID = require('mongodb').ObjectID;
var prodSchema = require("./production.schema.server");
var prodModel = mongoose.model("ProductionModel", prodSchema);

prodModel.createProductionHouse = createProductionHouse;
prodModel.findProductionHouseByCredentials = findProductionHouseByCredentials;
prodModel.findProductionHouseById = findProductionHouseById;
prodModel.findMovie = findMovie;
prodModel.addToSoldItems = addToSoldItems;
prodModel.updateMovieQuantity = updateMovieQuantity;

module.exports = prodModel;

function createProductionHouse(prod) {
    return prodModel.create(prod);
}

function findProductionHouseByCredentials(username,password) {
    return prodModel.findOne({username:username,password:password});
}

function findProductionHouseById(prodId) {
    return prodModel.findOne({_id: new ObjectID(prodId)});
}

function findMovie(movieId) {
    return prodModel.find()
        .then(function (prods) {
            var d = [];
            console.log(prods);
            for(var i=0;i<prods.length;i++){
                for(var j=0;j<prods[i].movies.length;j++){
                    if(movieId===prods[i].movies[j].Id){
                        var m={
                            productionHouseId: prods[i].id,
                            productionHouse: prods[i].productionHouseName,
                            quant: prods[i].movies[j].quantity,
                            cost: prods[i].movies[j].cost
                        };
                        d.push(m);
                    }

                }

            }
            return d;
        });
}

function addToSoldItems(prodId, item) {
    return prodModel.findOneAndUpdate({_id: new ObjectID(prodId)}, {$push: {"mySoldItems": item}});
}

function updateMovieQuantity(prodId, movieId, quantity) {
    return prodModel.findOne({'_id': new ObjectID(prodId), 'movies.Id': movieId})
        .then(function (prod) {
            var q = 0;
            for(var i=0;i<prod.movies.length;i++){
                if(movieId === prod.movies[i].Id){
                    q = prod.movies[i].quantity;
                }
            }
            return prodModel.findOneAndUpdate({'_id': new ObjectID(prodId), 'movies.Id': movieId}, {$set: {'movies.$.quantity': q-quantity}});
        });
}
