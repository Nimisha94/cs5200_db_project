(function () {
    angular
        .module('Moviez')
        .controller('OrderController', OrderController);

    function OrderController(userService, dealerService, $routeParams) {

        var model = this;

        model.role = $routeParams['role'];
        model.userId = $routeParams['userId'];

        function init() {
            if(model.role==='user'){
                userService.findUserById(parseInt(model.userId))
                    .then(function (user) {
                        console.log(user);
                        model.user = user;
                    });
            }
                //model.user = userService.findUserById(parseInt(model.userId));
            else if(model.role==='dealer')
                model.user = dealerService.findDealerById(parseInt(model.userId));
            console.log(model.user);
        }

        init();
    }
})();