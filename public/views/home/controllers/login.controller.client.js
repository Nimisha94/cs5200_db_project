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
                var user = userService.login(username,password);
                if(typeof user !== undefined)
                    $location.url('/'+user.role+'/'+user.id+'/search');
            }
            else if(usertype==='dealer')
            {
                console.log(usertype);
                var user = dealerService.login(username,password);
                if(typeof user !== undefined)
                    $location.url('/'+user.role+'/'+user.id+'/search');
            }
            else if(usertype==='productionhouse')
            {
                var user = productionService.login(username,password);
                if(typeof user !== undefined)
                    $location.url('/'+user.role+'/'+user.id+'/search');
            }
        }
    }
})();