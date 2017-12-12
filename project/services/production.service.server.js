var app = require("../../express");

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
app.get('/api/production/:prodId', findProductionHouseById);
app.get('/api/production/findMovie/:movieId', findMovie);
app.post('/api/production/:prodId/addToSoldItems', addToSoldItems);
app.post('/api/production/:prodId/updateMovieQuantity', updateMovieQuantity);

function register(req, res) {
    var productionhouse = req.body;
    productionhouses.push(productionhouse);
    console.log(productionhouses);
    res.json(productionhouse);
}

function login(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    for(var i=0;i<productionhouses.length;i++){
        if(productionhouses[i].username===username && productionhouses[i].password===password){
            res.json(productionhouses[i]);
        }
    }
}

function findProductionHouseById(req, res) {
    var prodId = parseInt(req.params['prodId']);
    for(var i=0;i<productionhouses.length;i++){
        if(productionhouses[i].id===prodId){
            res.json(productionhouses[i]);
        }
    }
}

function findMovie(req, res) {
    var movieId = parseInt(req.params.movieId);
    var d=[];
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
    res.json(d);
}

function addToSoldItems(req, res) {
    var productionHouseId = parseInt(req.params.prodId);
    var items = req.body.items;
    var orderId = req.body.orderId;
    var dealerId = req.body.dealerId;
    var dealerLocation = req.body.dealerLocation;

    for(var i=0;i<productionhouses.length;i++){
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
    res.sendStatus(200);
}

function updateMovieQuantity(req, res) {
    var productionHouseId = parseInt(req.params.prodId);
    var movieId = parseInt(req.body.movieId);
    var quantity = parseInt(req.body.quantity);

    for(var i=0;i<productionhouses.length;i++){
        if(productionHouseId===productionhouses[i].id){
            for(var j=0;j<productionhouses[i].movies.length;j++){
                if(movieId===productionhouses[i].movies[j].Id){
                    productionhouses[i].movies[j].quantity-=quantity;
                }
            }
        }
    }
    res.sendStatus(200);
}