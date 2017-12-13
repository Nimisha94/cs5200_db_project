var app = require("../../express");
var userModel=require("../model/user/user.model.server");


var users=[{
    id: 123,
    username: "u1",
    password: "u1",
    role: "user",
    firstName: "u1",
    lastName: "u1",
    address: "u1",
    cart: [],
    myOrders:[]
},
    {
        id: 234,
        username: "u2",
        password: "u2",
        role: "user",
        firstName: "u2",
        lastName: "u2",
        address: "u2",
        cart: [],
        myOrders:[]
    }
];

app.post('/api/register', register);
app.get('/api/login', login);
app.get('/api/user/findAllUsers', findAllUsers);
app.delete('/api/user/:userId', deleteUser);
app.put('/api/user/:userId', updateUser);
app.get('/api/user/:userId', findUserById);
app.post('/api/user/:userId/cart', addToCart);
app.post('/api/user/:userId/removeFromCart', removeFromCart);
app.post('/api/user/:userId/addToOrder', addToOrder);
app.post('/api/user/:userId/changeOrderStatus', changeOrderStatus);

function register(req, res) {
    var user = req.body;
    userModel.createUser(user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
    /*users.push(user);
    console.log(users);
    res.json(user);*/
}

function login(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    userModel.findUserByCredentials(username, password)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
    /*for(var i=0;i<users.length;i++){
        if(users[i].username===username && users[i].password===password){
            res.json(users[i]);
        }
    }*/
}

function findUserById(req, res) {
    var userId = req.params['userId'];
    userModel.findUserById(userId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
    /*for(var i=0;i<users.length;i++){
        if(users[i].id===userId){
            res.json(users[i]);
        }
    }*/
}

function removeFromCart(req,res){//userId, cartItem) {
    var userId = parseInt(req.params['userId']);
    var cartItem = req.body;
    var useridx=-1,cartidx=-1;
    for(var i=0;i<users.length;i++){
        if(userId===users[i].id){
            var cart=users[i].cart;
            for(var j=0;j<cart.length;j++){
                if(JSON.stringify(cart[j])===JSON.stringify(cartItem)){//angular.equals(cart[j],cartItem)){
                    cartidx=j;
                    useridx=i;
                    break;
                }
            }
        }
    }
    users[useridx].cart.splice(cartidx,1);
    res.sendStatus(200);
}

function addToCart(req, res) {
    var userId = req.params['userId'];
    var orderObj = req.body;
    userModel.addToCart(userId,orderObj)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
    /*for(var i=0;i<users.length;i++){
        if(users[i].id===userId){
            users[i].cart.push(orderObj);
            res.status(200);
        }
    }*/
}

function addToOrder(req, res) {
    var userId = req.params.userId;
    /*for(var i=0;i<users.length;i++){
        if(userId===users[i].id){
            var order={
                id: users[i].myOrders.length,
                items: users[i].cart,
                status: 'Order placed'
            };
            users[i].myOrders.push(order);
            users[i].cart=[];
        }
    }*/
    userModel.addToOrder(userId)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
}

function changeOrderStatus(req, res) {
    var userId = req.params.userId;
    var orderId = parseInt(req.body.orderId);
    userModel.changeOrderStatus(userId, orderId)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
    /*for(var i=0;i<users.length;i++){
        if(userId===users[i].id){
            orders=users[i].myOrders;
            for(var j=0;j<orders.length;j++){
                if(orderId===orders[j].id){
                    orders[j].status="Delivered";
                }
            }
        }
    }*/
}

function findAllUsers(req, res) {
    userModel.findAllUsers()
        .then(function (users) {
            res.json(users);
        }, function (err) {
            res.send(err);
        });
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel.deleteUser(userId)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
}

function updateUser(req, res) {
    var userId=req.params.userId;
    var user=req.body;
    userModel.findUserById(user._id)
        .then(function (userObj) {
            userModel.updateUser(userId, user)
                .then(function (status) {
                    res.sendStatus(200);
                }, function (err) {
                    res.sendStatus(404);
                });
        }, function (err) {
            console.log(err);
        });
}



