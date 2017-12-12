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
                userService.findUserById(model.userId)
                    .then(function (user) {
                        console.log(user);
                        model.user = user;
                    });
            }
                //model.user = userService.findUserById(parseInt(model.userId));
            else if(model.role==='dealer'){
                dealerService.findDealerById(model.userId)
                    .then(function (dealer) {
                        console.log(dealer);
                        model.user = dealer;
                    })
            }

            console.log(model.user);
        }

        init();
    }
})();