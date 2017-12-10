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
        }

        function login(username,password) {
            var url = '/api/login?username='+username+'&password='+password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function addToCart(userId, orderObj) {
            var url = '/api/user/'+userId+'/cart';
            return $http.post(url, orderObj)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = '/api/user/'+userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function removeFromCart(userId, cartItem) {
            var url = '/api/user/'+userId+'/removeFromCart';
            return $http.post(url,cartItem)
                .then(function (response) {
                    return response.data;
                });
        }

        function addToOrder(userId) {
            var url = '/api/user/'+userId+'/addToOrder';
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function changeOrderStatus(orderId, userId) {
            var url = '/api/user/'+userId+'/changeOrderStatus';
            var o = {
                orderId: orderId
            };
            return $http.post(url, o)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();