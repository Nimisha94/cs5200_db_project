(function () {
    angular
        .module('Moviez')
        .factory('userService', userService);

    function userService($http) {


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
            var url = '/api/register';
            return $http.post(url,user)
                .then(function (response) {
                    return response.data;
                });
            /*users.push(user);
            console.log(users);
            return user;*/
        }

        function login(username,password) {
            var url = '/api/login?username='+username+'&password='+password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            /*for(var i=0;i<users.length;i++){
                if(users[i].username===username && users[i].password===password){
                    return users[i];
                }
            }
            return null;*/
        }

        function addToCart(userId, orderObj) {
            var url = '/api/user/'+userId+'/cart';
            return $http.post(url, orderObj)
                .then(function (response) {
                    return response.data;
                });
            /*for(var i=0;i<users.length;i++){
                if(users[i].id===userId){
                    users[i].cart.push(orderObj);
                }
            }*/
        }

        function findUserById(userId) {
            var url = '/api/user/'+userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            /*for(var i=0;i<users.length;i++){
                if(users[i].id===userId){
                    return users[i];
                }
            }*/
        }

        function removeFromCart(userId, cartItem) {
            var url = '/api/user/'+userId+'/removeFromCart';
            return $http.post(url,cartItem)
                .then(function (response) {
                    return response.data;
                });
            /*var useridx=-1,cartidx=-1;
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
            users[useridx].cart.splice(cartidx,1);*/
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