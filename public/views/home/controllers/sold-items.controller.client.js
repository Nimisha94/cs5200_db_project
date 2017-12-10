(function () {
    angular
        .module('Moviez')
        .controller('SoldItemsController', SoldItemsController);

    function SoldItemsController(dealerService, userService, productionService, $routeParams) {

        var model = this;

        model.role = $routeParams['role'];
        model.userId = $routeParams['userId'];

        function init() {
            if(model.role==='dealer')
                model.user = dealerService.findDealerById(parseInt(model.userId));
            else if(model.role==='productionHouse')
                model.user = productionService.findProductionHouseById(parseInt(model.userId));
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
                dealerService.changeOrderStatus(orderId, userId);
        }

    }
})();