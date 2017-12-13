(function () {
    angular
        .module('Moviez')
        .controller('LoginController',LoginController);
    
    function LoginController(userService, dealerService, productionService, $location) {
        var model=this;
        
        //event handlers
        model.login=login;
        
        function login(username, password, usertype) {

            if(usertype=='admin'){
                userService.login(username,password)
                    .then(function (user) {
                        console.log(user);
                        if(typeof user !== undefined)
                            $location.url('/admin');
                    });
            }

            if(usertype==='user')
            {
                userService.login(username,password)
                    .then(function (user) {
                        console.log(user);
                        if(typeof user !== undefined)
                            $location.url('/'+user.role+'/'+user._id+'/search');
                    });
            }
            else if(usertype==='dealer')
            {

                dealerService.login(username,password)
                    .then(function (dealer) {
                        console.log(dealer);
                        if(typeof dealer !== undefined)
                            $location.url('/'+dealer.role+'/'+dealer._id+'/search');
                    });
            }
            else if(usertype==='productionHouse')
            {
                productionService.login(username,password)
                    .then(function (prod) {
                        console.log(prod);
                        if(typeof prod !== undefined)
                            $location.url('/'+prod.role+'/'+prod._id+'/search');
                    });
            }
        }
    }
})();