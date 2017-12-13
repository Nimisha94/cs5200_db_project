(function () {
    angular
        .module('Moviez')
        .factory('dealerService', dealerService);

    function dealerService($http) {

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

        var api={
            register: register,
            login: login,
            findMovie: findMovie,
            addToSoldItems: addToSoldItems,
            findDealerById: findDealerById,
            addToCart: addToCart,
            addToOrder: addToOrder,
            changeOrderStatus: changeOrderStatus,
            updateMovieQuantity: updateMovieQuantity,
            removeFromCart: removeFromCart,
            addMovies: addMovies,
            findAllDealers: findAllDealers,
            deleteDealer: deleteDealer,
            updateDealer: updateDealer,
            changeSoldItemsOrder: changeSoldItemsOrder
        };

        return api;

        function register(dealer) {
            var url = '/api/dealer/register';
            return $http.post(url,dealer)
                .then(function (response) {
                    return response.data;
                });
        }

        function findDealerById(dealerId) {
            var url = '/api/dealer/'+dealerId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function login(username, password) {
            var url = '/api/dealer/login?username='+username+'&password='+password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findMovie(movieId) {
            var url = '/api/dealer/findMovie/'+movieId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function addToSoldItems(dealerId, items, orderId, userId, userAddress) {
            var url = '/api/dealer/'+dealerId+'/addToSoldItems';
            var obj = {
                items: items,
                orderId: orderId,
                userId: userId,
                userAddress: userAddress
            };
            return $http.post(url, obj)
                .then(function (response) {
                    return response.data;
                });
        }

        function addToCart(dealerId, orderObj) {
            var url = '/api/dealer/'+dealerId+'/cart';
            return $http.post(url, orderObj)
                .then(function (response) {
                    return response.data;
                });
        }

        function removeFromCart(dealerId, cartItem) {
            var url = '/api/dealer/'+dealerId+'/removeFromCart';
            return $http.post(url,cartItem)
                .then(function (response) {
                    return response.data;
                });
        }

        function addToOrder(dealerId) {
            var url = '/api/dealer/'+dealerId+'/addToOrder';
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function changeOrderStatus(orderId, dealerId) {
            console.log(dealers);
            var url = '/api/dealer/'+dealerId+'/changeOrderStatus';
            var o = {
                orderId: orderId
            };
            return $http.post(url, o)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateMovieQuantity(dealerId, movieId, quantity) {
            var url = '/api/dealer/'+dealerId+'/updateMovieQuantity';
            var obj = {
                movieId: movieId,
                quantity: quantity
            };
            return $http.post(url, obj)
                .then(function (response) {
                    return response.data;
                });
        }

        function addMovies(dealerId, movie) {
            var url = '/api/dealer/'+dealerId+'/addMovie';
            var obj = {
                movie: movie
            };
            return $http.post(url, obj)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllDealers() {
            var url = '/api/dealer/findAllDealers';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteDealer(dealerId) {
            var url = '/api/dealer/'+dealerId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateDealer(dealer) {
            var url = '/api/dealer/'+dealer._id;
            return $http.put(url, dealer)
                .then(function (resp) {
                    return resp.data;
                });
        }

        function changeSoldItemsOrder(dealerId, orderId, userId) {
            var url = '/api/dealer/'+dealerId+'/changeSoldItemsOrder';
            var obj = {
                orderId: orderId,
                userId: userId
            };
            return $http.post(url, obj)
                .then(function (resp) {
                    return resp.data;
                });
        }

    }
})();