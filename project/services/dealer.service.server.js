var app = require("../../express");

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
app.get('/api/dealer/:dealerId', findDealerById);
app.post('/api/dealer/:dealerId/cart', addToCart);
app.post('/api/dealer/:dealerId/removeFromCart', removeFromCart);
app.post('/api/dealer/:dealerId/addToOrder', addToOrder);
app.post('/api/dealer/:dealerId/changeOrderStatus', changeOrderStatus);
app.get('/api/dealer/findMovie/:movieId', findMovie);
app.post('/api/dealer/:dealerId/addToSoldItems', addToSoldItems);
app.post('/api/dealer/:dealerId/updateMovieQuantity', updateMovieQuantity);

function register(req, res) {
    var dealer = req.body;
    dealers.push(dealer);
    console.log(dealers);
    res.json(dealer);
}

function login(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    for(var i=0;i<dealers.length;i++){
        if(dealers[i].username===username && dealers[i].password===password){
            res.json(dealers[i]);
        }
    }
}

function findDealerById(req, res) {
    var dealerId = parseInt(req.params['dealerId']);
    for(var i=0;i<dealers.length;i++){
        if(dealers[i].id===dealerId){
            res.json(dealers[i]);
        }
    }
}

function addToCart(req, res) {
    var dealerId = parseInt(req.params['dealerId']);
    var orderObj = req.body;
    for(var i=0;i<dealers.length;i++){
        if(dealers[i].id===dealerId){
            dealers[i].cart.push(orderObj);
            res.status(200);
        }
    }
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
    var dealerId = parseInt(req.params.dealerId);
    for(var i=0;i<dealers.length;i++){
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
    res.sendStatus(200);
}

function changeOrderStatus(req, res) {
    var dealerId = parseInt(req.params.dealerId);
    var orderId = parseInt(req.body.orderId);

    for(var i=0;i<dealers.length;i++){
        if(dealerId===dealers[i].id){
            orders=dealers[i].myPurchases;
            for(var j=0;j<orders.length;j++){
                if(orderId===orders[j].id){
                    orders[j].status="Delivered";
                    console.log(orders[j]);
                    for(var k=0;k<orders[j].items.length;k++){
                        var o={
                            Id: orders[j].items[k].movie.id,
                            quantity: orders[j].items[k].quantity,
                            cost: orders[j].items[k].productionHouse.cost + (orders[j].items[k].productionHouse.cost * 20/100)
                        };
                        dealers[i].movies.push(o);
                    }

                }
            }
        }
    }
}

function findMovie(req, res) {
    var movieId = parseInt(req.params.movieId);
    var d=[];
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
    res.json(d);
}

function addToSoldItems(req, res) {
    var dealerId = parseInt(req.params.dealerId);
    var items = req.body.items;
    var orderId = parseInt(req.body.orderId);
    var userId = parseInt(req.body.userId);
    var userAddress = req.body.userAddress;

    for(var i=0;i<dealers.length;i++){
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
    res.sendStatus(200);
}

function updateMovieQuantity(req, res) {
    var dealerId = parseInt(req.params.dealerId);
    var movieId = parseInt(req.body.movieId);
    var quantity = parseInt(req.body.quantity);

    for(var i=0;i<dealers.length;i++){
        if(dealerId===dealers[i].id){
            for(var j=0;j<dealers[i].movies.length;j++){
                if(movieId===dealers[i].movies[j].Id){
                    dealers[i].movies[j].quantity-=quantity;
                }
            }
        }
    }
    res.sendStatus(200);
}