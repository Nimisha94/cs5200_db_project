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
                    username: username,
                    password: password,
                    role: usertype,
                    firstName: firstname,
                    lastName: lastname,
                    address: address,
                    cart: [],
                    myOrders:[]
                };
                userService.register(user)
                    .then(function (user) {
                        console.log(user);
                    });
                $location.url('/');
            }
            else if (usertype==='admin'){
                var user = {
                    username: username,
                    password: password,
                    role: 'admin',
                    firstName: firstname,
                    lastName: lastname,
                    address: address,
                    cart: [],
                    myOrders:[]
                };
                userService.register(user)
                    .then(function (user) {
                        console.log(user);
                    });
                $location.url('/');
            }
            else if (usertype==='dealer'){
                var dealer = {
                    username: username,
                    password: password,
                    role: usertype,
                    dealerName: dealerName,
                    dealerLocation: dealerLocation
                };
                dealerService.register(dealer)
                    .then(function(dealer){
                        console.log(dealer);
                    });
                $location.url('/');
            }
            else if (usertype==='productionHouse'){
                var productionHouse = {
                    username: username,
                    password: password,
                    role: usertype,
                    productionHouseName: productionHouseName,
                    location: location
                };
                productionService.register(productionHouse)
                    .then(function (prod) {
                        console.log(prod);
                    });
                $location.url('/');
            }


        }
    }
})();