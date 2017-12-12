(function () {
    angular
        .module('Moviez')
        .controller('SoldItemsController', SoldItemsController);

    function SoldItemsController(dealerService, userService, productionService, $routeParams) {

        var model = this;

        model.role = $routeParams['role'];
        model.userId = $routeParams['userId'];

        function init() {
            if(model.role==='dealer'){
                dealerService.findDealerById(parseInt(model.userId))
                    .then(function (dealer) {
                        model.user = dealer;
                    });
            }
            else if(model.role==='productionHouse'){
                productionService.findProductionHouseById(parseInt(model.userId))
                    .then(function (prod) {
                        model.user = prod;
                    });
            }
        }

        init();
        
        //event handlers
        model.approveOrder = approveOrder;
        
        function approveOrder(orderId, userId) {
            if(model.role ==='dealer'){
                userService.changeOrderStatus(orderId, userId)
                    .then(function (response) {

                    });
            }
                //userService.changeOrderStatus(orderId, userId);
            else if(model.role === 'productionHouse')
                dealerService.changeOrderStatus(orderId, userId)
                    .then(function (response) {
                        
                    });
        }

    }
})();