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
            productionhouses.push(productionhouse);
            console.log(productionhouses);
            return productionhouse;
        }

        function login(username, password) {
            for(var i=0;i<productionhouses.length;i++){
                if(productionhouses[i].username===username && productionhouses[i].password===password){
                    return productionhouses[i];
                }
            }
            return null;
        }

        function findProductionHouseById(prodId) {
            for(var i=0;i<productionhouses.length;i++){
                if(productionhouses[i].id===prodId){
                    return productionhouses[i];
                }
            }
        }

        function findMovie(movieId) {
            var d=[];
            for(var i=0;i<productionhouses.length;i++){
                var movies=productionhouses[i].movies;
                //console.log('movies--',movies[0].Id);
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
            return d;
        }

        function addToSoldItems(productionHouseId, items, orderId, dealerId, dealerLocation) {
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
        }

        function updateMovieQuantity(productionHouseId, movieId, quantity) {
            for(var i=0;i<productionhouses.length;i++){
                if(productionHouseId===productionhouses[i].id){
                    for(var j=0;j<productionhouses[i].movies.length;j++){
                        if(movieId===productionhouses[i].movies[j].Id){
                            productionhouses[i].movies[j].quantity-=quantity;
                        }
                    }
                }
            }
        }

    }
})();