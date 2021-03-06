var app = require("../../express");
var dealerModel=require("../model/dealer/dealer.model.server");

var dealers=[{
    id: 111,
    username: "d1",
    password: "d1",
    role: "dealer",
    dealerName: "Dealer1",
    dealerLocation: "d1",
    movies: [{Id:985, quantity: 3, cost: 25}],
    cart: [],
    myPurchases: [],
    mySoldItems: []
},
    {
        id: 222,
        username: "d2",
        password: "d2",
        role: "dealer",
        dealerName: "Dealer2",
        dealerLocation: "d2",
        movies: [{Id:984, quantity: 3, cost: 10}],
        cart: [],
        myPurchases: [],
        mySoldItems: []
    }];

app.post('/api/dealer/register', register);
app.get('/api/dealer/login', login);
app.get('/api/dealer/findAllDealers', findAllDealers);
app.delete('/api/dealer/:dealerId', deleteDealer);
app.put('/api/dealer/:dealerId', updateDealer);
app.get('/api/dealer/:dealerId', findDealerById);
app.post('/api/dealer/:dealerId/cart', addToCart);
app.post('/api/dealer/:dealerId/removeFromCart', removeFromCart);
app.post('/api/dealer/:dealerId/addToOrder', addToOrder);
app.post('/api/dealer/:dealerId/changeOrderStatus', changeOrderStatus);
app.get('/api/dealer/findMovie/:movieId', findMovie);
app.post('/api/dealer/:dealerId/addToSoldItems', addToSoldItems);
app.post('/api/dealer/:dealerId/updateMovieQuantity', updateMovieQuantity);
app.post('/api/dealer/:dealerId/addMovie', addMovies);
app.post('/api/dealer/:dealerId/changeSoldItemsOrder', changeSoldItemsOrder);

function register(req, res) {
    /*var dealer = req.body;
    dealers.push(dealer);
    console.log(dealers);
    res.json(dealer);*/
    var dealer = req.body;
    dealerModel.createDealer(dealer)
        .then(function (dealer) {
            res.json(dealer);
        }, function (err) {
            res.send(err);
        });
}

function login(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    /*for(var i=0;i<dealers.length;i++){
        if(dealers[i].username===username && dealers[i].password===password){
            res.json(dealers[i]);
        }
    }*/
    dealerModel.findDealerByCredentials(username, password)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
}

function findDealerById(req, res) {
    var dealerId = req.params['dealerId'];
    dealerModel.findDealerById(dealerId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
    /*for(var i=0;i<dealers.length;i++){
        if(dealers[i].id===dealerId){
            res.json(dealers[i]);
        }
    }*/
}

function addToCart(req, res) {
    var dealerId = req.params['dealerId'];
    var orderObj = req.body;
    dealerModel.addToCart(dealerId,orderObj)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
    /*for(var i=0;i<dealers.length;i++){
        if(dealers[i].id===dealerId){
            dealers[i].cart.push(orderObj);
            res.status(200);
        }
    }*/
}

function removeFromCart(req,res){
    var dealerId = parseInt(req.params['dealerId']);
    var cartItem = req.body;
    var useridx=-1,cartidx=-1;
    for(var i=0;i<dealers.length;i++){
        if(dealerId===dealers[i].id){
            var cart=dealers[i].cart;
            for(var j=0;j<cart.length;j++){
                if(JSON.stringify(cart[j])===JSON.stringify(cartItem)){
                    cartidx=j;
                    useridx=i;
                    break;
                }
            }
        }
    }
    dealers[useridx].cart.splice(cartidx,1);
    res.sendStatus(200);
}

function addToOrder(req, res) {
    var dealerId = req.params.dealerId;
    dealerModel.addToOrder(dealerId)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
    /*for(var i=0;i<dealers.length;i++){
        if(dealerId===dealers[i].id){
            var order={
                id: dealers[i].myPurchases.length,
                items: dealers[i].cart,
                status: 'Order placed'
            };
            dealers[i].myPurchases.push(order);
            dealers[i].cart=[];
        }
    }
    res.sendStatus(200);*/
}

function changeOrderStatus(req, res) {
    var dealerId = req.params.dealerId;
    var orderId = parseInt(req.body.orderId);

    dealerModel.changeOrderStatus(dealerId, orderId)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
    /*dealerModel.changeOrderStatus(dealerId,orderId)
        .then(function (status) {
            dealerModel.findDealerById(dealerId)
                .then(function (dealer) {
                    var orders = dealer.myPurchases;
                    for(var i=0;i<orders.length;i++){
                        if(orders[i].id === orderId){
                            for(var j=0;j<orders[i].items.length;j++){
                                var m = {
                                    Id: orders[i].items[j].movie.id,
                                    quantity: orders[i].items[j].quantity,
                                    cost: orders[i].items[j].productionHouse.cost + (orders[i].items[j].productionHouse.cost * 20 / 100)
                                };
                                dealerModel.addMovies(dealerId,m)
                                    .then(function (st) {
                                        if(i===orders.length-1){
                                            res.sendStatus(200);
                                        }
                                    }, function (err) {
                                        res.sendStatus(404);
                                    });
                            }
                        }
                    }
                    //res.sendStatus(200);
                })
        }, function (err) {
            res.sendStatus(404);
        });
    */
}

function findMovie(req, res) {
    var movieId = parseInt(req.params.movieId);
    dealerModel.findMovie(movieId)
        .then(function (d) {
            res.json(d);
        }, function (err) {
            res.json(null);
        });
    /*var d=[];
    for(var i=0;i<dealers.length;i++){
        var movies=dealers[i].movies;
        console.log('movies--',movies[0].Id);
        for(var j=0;j<movies.length;j++){
            if(movieId===movies[j].Id){
                var m={
                    dealerId: dealers[i].id,
                    dealer: dealers[i].dealerName,
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
    var dealerId = req.params.dealerId;
    var items = req.body.items;
    var orderId = parseInt(req.body.orderId);
    var userId = req.body.userId;
    var userAddress = req.body.userAddress;
    var o={
        orderId: orderId,
        items: items,
        status: "Order Placed",
        userId: userId,
        userAddress: userAddress
    };
    dealerModel.addToSoldItems(dealerId,o)
        .then(function (status) {
            res.sendStatus(200);
        }, function (status) {
            res.sendStatus(404);
        });

    /*for(var i=0;i<dealers.length;i++){
        if(dealerId===dealers[i].id){
            var o={
                orderId: orderId,
                items: items,
                status: "Order Placed",
                userId: userId,
                userAddress: userAddress
            };
            dealers[i].mySoldItems.push(o);
        }
    }
    console.log(dealers);
    res.sendStatus(200);*/
}

function updateMovieQuantity(req, res) {
    var dealerId = req.params.dealerId;
    var movieId = parseInt(req.body.movieId);
    var quantity = parseInt(req.body.quantity);

    dealerModel.updateMovieQuantity(dealerId, movieId, quantity)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
    /*for(var i=0;i<dealers.length;i++){
        if(dealerId===dealers[i].id){
            for(var j=0;j<dealers[i].movies.length;j++){
                if(movieId===dealers[i].movies[j].Id){
                    dealers[i].movies[j].quantity-=quantity;
                }
            }
        }
    }
    res.sendStatus(200);*/
}

function addMovies(req, res) {
    var dealerId = req.params.dealerId;
    var m = req.body.movie;

    dealerModel.addMovies(dealerId, m)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        })
}

function findAllDealers(req, res) {
    dealerModel.findAllDealers()
        .then(function (dealers) {
            res.json(dealers);
        }, function (err) {
            res.send(err);
        });
}

function deleteDealer(req, res) {
    var dealerId = req.params.dealerId;
    dealerModel.deleteDealer(dealerId)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
}

function updateDealer(req, res) {
    var dealerId=req.params.dealerId;
    var dealer=req.body;
    dealerModel.findDealerById(dealer._id)
        .then(function (dealerObj) {
            dealerModel.updateDealer(dealerId, dealer)
                .then(function (status) {
                    res.sendStatus(200);
                }, function (err) {
                    res.sendStatus(404);
                });
        }, function (err) {
            console.log(err);
        });
}

function changeSoldItemsOrder(req, res) {
    var dealerId = req.params.dealerId;
    var userId = req.body.userId;
    var orderId = req.body.orderId;
    dealerModel.changeSoldItemsOrder(dealerId, userId, orderId)
        .then(function (status) {
            res.sendStatus(200);
        },function (err) {
            res.sendStatus(404);
        });
}