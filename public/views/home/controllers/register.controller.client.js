(function () {
    angular
        .module('Moviez')
        .controller('RegisterController', RegisterController);
    
    function RegisterController(userService, dealerService, productionService, $location) {
        var model = this;

        //event handlers
        model.register = register;

        function register(username, password, firstname, lastname, address, usertype, dealerName, dealerLocation,
                          productionHouseName, location)
        {
            //var user=null;
            if (usertype==='user'){
                var user = {
                    id: 123,
                    username: username,
                    password: password,
                    role: usertype,
                    firstName: firstname,
                    lastName: lastname,
                    address: address,
                    cart: [],
                    myOrders:[]
                };
                console.log(userService.register(user));
                $location.url('/');
            }
            else if (usertype==='dealer'){
                var dealer = {
                    id: 234,
                    username: username,
                    password: password,
                    role: usertype,
                    dealerName: dealerName,
                    dealerLocation: dealerLocation,
                    movies: [{Id:985, quantity: 3, cost: 25},{Id:984, quantity: 3, cost: 10}],
                    cart: [],
                    myPurchases: [],
                    mySoldItems: []
                };
                console.log(dealerService.register(dealer));
                $location.url('/');
            }
            else if (usertype==='productionHouse'){
                var productionHouse = {
                    id: 456,
                    username: username,
                    password: password,
                    role: usertype,
                    productionHouseName: productionHouseName,
                    location: location,
                    movies: [{Id:981, quantity: 200, cost: 25},{Id:982, quantity: 300, cost: 10}],
                    mySoldItems: []
                };
                console.log(productionService.register(productionHouse));
                $location.url('/');
            }


        }
    }
})();