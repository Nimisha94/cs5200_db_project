(function () {
    angular
        .module('Moviez')
        .factory('productionService', productionService);

    function productionService($http) {

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

        var api={
            register: register,
            login: login,
            findProductionHouseById: findProductionHouseById,
            findMovie: findMovie,
            addToSoldItems: addToSoldItems,
            updateMovieQuantity: updateMovieQuantity
        };

        return api;

        function register(productionhouse) {
            var url = '/api/production/register';
            return $http.post(url,productionhouse)
                .then(function (response) {
                    return response.data;
                });
        }

        function login(username, password) {
            var url = '/api/production/login?username='+username+'&password='+password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findProductionHouseById(prodId) {
            var url = '/api/production/'+prodId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findMovie(movieId) {
            var url = '/api/production/findMovie/'+movieId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function addToSoldItems(productionHouseId, items, orderId, dealerId, dealerLocation) {
            var url = '/api/production/'+productionHouseId+'/addToSoldItems';
            var obj = {
                items: items,
                orderId: orderId,
                dealerId: dealerId,
                dealerLocation: dealerLocation
            };
            return $http.post(url, obj)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateMovieQuantity(productionHouseId, movieId, quantity) {
            var url = '/api/production/'+productionHouseId+'/updateMovieQuantity';
            var obj = {
                movieId: movieId,
                quantity: quantity
            };
            return $http.post(url, obj)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();