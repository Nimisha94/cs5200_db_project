var app = require("../../express");


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
app.get('/api/user/:userId', findUserById);
app.post('/api/user/:userId/cart', addToCart);
app.post('/api/user/:userId/removeFromCart', removeFromCart);

function register(req, res) {
    var user = req.body;
    users.push(user);
    console.log(users);
    res.json(user);
}

function login(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    for(var i=0;i<users.length;i++){
        if(users[i].username===username && users[i].password===password){
            res.json(users[i]);
        }
    }
}

function findUserById(req, res) {
    var userId = parseInt(req.params['userId']);
    for(var i=0;i<users.length;i++){
        if(users[i].id===userId){
            res.json(users[i]);
        }
    }
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
    var userId = parseInt(req.params['userId']);
    var orderObj = req.body;
    for(var i=0;i<users.length;i++){
        if(users[i].id===userId){
            users[i].cart.push(orderObj);
            res.status(200);
        }
    }
}


