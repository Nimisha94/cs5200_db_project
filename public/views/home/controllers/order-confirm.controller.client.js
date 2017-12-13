(function () {
    angular
        .module('Moviez')
        .controller('OrderConfirmController', OrderConfirmController);

    function OrderConfirmController(userService, dealerService, productionService, $routeParams) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.role = $routeParams['role'];

        function init() {
            if(model.role==='user'){
                userService.findUserById(model.userId)
                    .then(function (user) {
                        model.user = user;
                    });
            }
            else if(model.role==='dealer'){
                dealerService.findDealerById(model.userId)
                    .then(function (dealer) {
                        model.user = dealer;
                    });
            }
            else if(model.role==='productionHouse'){
                productionService.findProductionHouseById(model.userId)
                    .then(function (prod) {
                        model.user = prod;
                    });
            }
        }

        init();
    }
})();