(function () {
    angular
        .module('Moviez')
        .controller('LoginController',LoginController);
    
    function LoginController(userService, dealerService, productionService, $location) {
        var model=this;
        
        //event handlers
        model.login=login;
        
        function login(username, password, usertype) {

            if(usertype==='user')
            {
                userService.login(username,password)
                    .then(function (user) {
                        console.log(user);
                        if(typeof user !== undefined)
                            $location.url('/'+user.role+'/'+user.id+'/search');
                    });
            }
            else if(usertype==='dealer')
            {

                dealerService.login(username,password)
                    .then(function (dealer) {
                        console.log(dealer);
                        if(typeof dealer !== undefined)
                            $location.url('/'+dealer.role+'/'+dealer.id+'/search');
                    });
            }
            else if(usertype==='productionHouse')
            {
                var user = productionService.login(username,password);
                console.log(user);
                if(typeof user !== undefined)
                    $location.url('/'+user.role+'/'+user.id+'/search');
            }
        }
    }
})();