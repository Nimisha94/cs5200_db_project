(function () {
    angular
        .module('Moviez')
        .controller('SoldItemsController', SoldItemsController);

    function SoldItemsController(dealerService, userService, $routeParams) {

        var model = this;

        model.userId = $routeParams['userId'];

        function init() {
            model.user = dealerService.findDealerById(parseInt(model.userId));
        }

        init();
        
        //event handlers
        model.approveOrder = approveOrder;
        
        function approveOrder(orderId, userId) {
            userService.changeOrderStatus(orderId, userId);
        }

    }
})();