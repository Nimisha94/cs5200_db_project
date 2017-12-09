(function () {
    angular
        .module('Moviez')
        .factory('userService', userService);

    function userService($http) {

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

        var api={
            register: register,
            login: login,
            addToCart: addToCart,
            findUserById: findUserById,
            removeFromCart: removeFromCart,
            addToOrder: addToOrder,
            changeOrderStatus: changeOrderStatus
        };

        return api;

        function register(user) {
            users.push(user);
            console.log(users);
            return user;
        }

        function login(username,password) {
            for(var i=0;i<users.length;i++){
                if(users[i].username===username && users[i].password===password){
                    return users[i];
                }
            }
            return null;
        }

        function addToCart(userId, orderObj) {
            for(var i=0;i<users.length;i++){
                if(users[i].id===userId){
                    users[i].cart.push(orderObj);
                }
            }
        }

        function findUserById(userId) {
            for(var i=0;i<users.length;i++){
                if(users[i].id===userId){
                    return users[i];
                }
            }
        }

        function removeFromCart(userId, cartItem) {
            var useridx=-1,cartidx=-1;
            for(var i=0;i<users.length;i++){
                if(userId===users[i].id){
                    var cart=users[i].cart;
                    for(var j=0;j<cart.length;j++){
                        if(angular.equals(cart[j],cartItem)){
                            cartidx=j;
                            useridx=i;
                            break;
                        }
                    }
                }
            }
            users[useridx].cart.splice(cartidx,1);
        }

        function addToOrder(userId) {

            for(var i=0;i<users.length;i++){
                if(userId===users[i].id){
                   var order={
                       id: users[i].myOrders.length,
                       items: users[i].cart,
                       status: 'Order placed'
                   };
                   users[i].myOrders.push(order);
                   users[i].cart=[];
                }
            }
        }

        function changeOrderStatus(orderId, userId) {
            for(var i=0;i<users.length;i++){
                if(userId===users[i].id){
                    orders=users[i].myOrders;
                    for(var j=0;j<orders.length;j++){
                        if(orderId===orders[j].id){
                            orders[j].status="Delivered";
                        }
                    }
                }
            }
        }
    }
})();