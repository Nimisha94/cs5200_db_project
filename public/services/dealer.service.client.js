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
            myPurchases: [],
            mySoldItems: []
        }];

        var api={
            register: register,
            login: login,
            findMovie: findMovie,
            addToSoldItems: addToSoldItems,
            findDealerById: findDealerById
        };

        return api;

        function register(dealer) {
            dealers.push(dealer);
            console.log(dealers);
            return dealer;
        }

        function findDealerById(dealerId) {
            for(var i=0;i<dealers.length;i++){
                if(dealers[i].id===dealerId){
                    return dealers[i];
                }
            }
        }

        function login(username, password) {
            for(var i=0;i<dealers.length;i++){
                if(dealers[i].username===username && dealers[i].password===password){
                    return dealers[i];
                }
            }
            return null;
        }

        function findMovie(movieId) {
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
            return d;
        }

        function addToSoldItems(dealerId, items, orderId, userId, userAddress) {
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
        }
    }
})();