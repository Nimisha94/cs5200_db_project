var app = require("../../express");
var prodModel=require("../model/productionHouse/production.model.server");

var productionhouses=[{
    id: 1,
    username: "p1",
    password: "p1",
    role: "productionHouse",
    productionHouseName: "Production House 1",
    location: "xyz",
    movies: [{Id:981, quantity: 200, cost: 25},{Id:982, quantity: 300, cost: 10}],
    mySoldItems: []
},
    {
        id: 2,
        username: "p2",
        password: "p2",
        role: "productionHouse",
        productionHouseName: "Production House 2",
        location: "abc",
        movies: [{Id:980, quantity: 200, cost: 25},{Id:983, quantity: 300, cost: 10}],
        mySoldItems: []
    }];

app.post('/api/production/register', register);
app.get('/api/production/login', login);
app.get('/api/production/findAllProds', findAllProds);
app.delete('/api/production/:prodId', deleteProd);
app.put('/api/production/:prodId', updateProd);
app.get('/api/production/:prodId', findProductionHouseById);
app.get('/api/production/findMovie/:movieId', findMovie);
app.post('/api/production/:prodId/addToSoldItems', addToSoldItems);
app.post('/api/production/:prodId/updateMovieQuantity', updateMovieQuantity);
app.post('/api/production/:prodId/addToStock', addToStock);

function register(req, res) {
    var productionhouse = req.body;
    /*productionhouses.push(productionhouse);
    console.log(productionhouses);
    res.json(productionhouse);*/
    prodModel.createProductionHouse(productionhouse)
        .then(function (productionhouse) {
            res.json(productionhouse);
        }, function (err) {
            res.send(err);
        });
}

function login(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    /*for(var i=0;i<productionhouses.length;i++){
        if(productionhouses[i].username===username && productionhouses[i].password===password){
            res.json(productionhouses[i]);
        }
    }*/
    prodModel.findProductionHouseByCredentials(username, password)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
}

function findProductionHouseById(req, res) {
    var prodId = req.params['prodId'];
    /*for(var i=0;i<productionhouses.length;i++){
        if(productionhouses[i].id===prodId){
            res.json(productionhouses[i]);
        }
    }*/
    prodModel.findProductionHouseById(prodId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
}

function findMovie(req, res) {
    var movieId = parseInt(req.params.movieId);
    prodModel.findMovie(movieId)
        .then(function (d) {
            res.json(d);
        }, function (err) {
            res.json(null);
        });
    /*var d=[];
    for(var i=0;i<productionhouses.length;i++){
        var movies=productionhouses[i].movies;
        for(var j=0;j<movies.length;j++){
            if(movieId===movies[j].Id){
                var m={
                    productionHouseId: productionhouses[i].id,
                    productionHouse: productionhouses[i].productionHouseName,
                    quant: movies[j].quantity,
                    cost: movies[j].cost
                };
                d.push(m);
            }
        }
    }
    res.json(d);*/
}

function addToSoldItems(req, res) {
    var productionHouseId = req.params.prodId;
    var items = req.body.items;
    var orderId = req.body.orderId;
    var dealerId = req.body.dealerId;
    var dealerLocation = req.body.dealerLocation;
    var o={
        orderId: orderId,
        items: items,
        status: "Order Placed",
        dealerId: dealerId,
        dealerLocation: dealerLocation
    };
    prodModel.addToSoldItems(productionHouseId,o)
        .then(function (status) {
            res.sendStatus(200);
        }, function (status) {
            res.sendStatus(404);
        });

    /*for(var i=0;i<productionhouses.length;i++){
        if(productionHouseId===productionhouses[i].id){
            var o={
                orderId: orderId,
                items: items,
                status: "Order Placed",
                dealerId: dealerId,
                dealerLocation: dealerLocation
            };
            productionhouses[i].mySoldItems.push(o);
        }
    }
    console.log(productionhouses);
    res.sendStatus(200);*/
}

function updateMovieQuantity(req, res) {
    var productionHouseId = req.params.prodId;
    var movieId = parseInt(req.body.movieId);
    var quantity = parseInt(req.body.quantity);

    prodModel.updateMovieQuantity(productionHouseId, movieId, quantity)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
    /*for(var i=0;i<productionhouses.length;i++){
        if(productionHouseId===productionhouses[i].id){
            for(var j=0;j<productionhouses[i].movies.length;j++){
                if(movieId===productionhouses[i].movies[j].Id){
                    productionhouses[i].movies[j].quantity-=quantity;
                }
            }
        }
    }
    res.sendStatus(200);*/
}

function addToStock(req, res) {
    var productionHouseId = req.params.prodId;
    var movieId = parseInt(req.body.movieId);
    var quantity = parseInt(req.body.quantity);
    var cost = parseInt(req.body.cost);

    prodModel.addToStock(productionHouseId, movieId, quantity, cost)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
}

function findAllProds(req, res) {
    prodModel.findAllProds()
        .then(function (prods) {
            res.json(prods);
        }, function (err) {
            res.send(err);
        });
}

function deleteProd(req, res) {
    var prodId = req.params.prodId;
    prodModel.deleteProd(prodId)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
}

function updateProd(req, res) {
    var prodId=req.params.prodId;
    var prod=req.body;
    prodModel.findProductionHouseById(prod._id)
        .then(function (prodObj) {
            prodModel.updateProd(prodId, prod)
                .then(function (status) {
                    res.sendStatus(200);
                }, function (err) {
                    res.sendStatus(404);
                });
        }, function (err) {
            console.log(err);
        });
}