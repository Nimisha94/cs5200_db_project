(function () {
    angular
        .module('Moviez')
        .controller('SoldItemsController', SoldItemsController);

    function SoldItemsController(dealerService, userService, productionService, $routeParams) {

        var model = this;

        model.role = $routeParams['role'];
        model.userId = $routeParams['userId'];

        function init() {
            model.placed = true;
            if(model.role==='dealer'){
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
        
        //event handlers
        model.approveOrder = approveOrder;
        model.checkStatus = checkStatus;

        function approveOrder(orderId, userId) {
            if(model.role ==='dealer'){
                userService.changeOrderStatus(orderId, userId)
                    .then(function (response) {
                        dealerService.changeSoldItemsOrder(model.userId, orderId, userId)
                            .then(function (resp) {

                            });
                    });
            }
                //userService.changeOrderStatus(orderId, userId);
            else if(model.role === 'productionHouse')
                dealerService.changeOrderStatus(orderId, userId)
                    .then(function (response) {
                        dealerService.findDealerById(userId)
                            .then(function (dealer) {
                                var orders = dealer.myPurchases;
                                for(var i=0;i<orders.length;i++){
                                    if(orders[i].id === orderId){
                                        for(var j=0;j<orders[i].items.length;j++){
                                            var m = {
                                                Id: orders[i].items[j].movie.id,
                                                quantity: parseInt(orders[i].items[j].quantity),
                                                cost: orders[i].items[j].productionHouse.cost + (orders[i].items[j].productionHouse.cost * 20 / 100)
                                            };

                                            dealerService.addMovies(userId,m)
                                                .then(function (res) {

                                                });
                                        }
                                    }
                                }
                            });
                    });
        }

        function checkStatus(orderId, userId) {
            if(model.role==='dealer'){
                userService.findUserById(userId)
                    .then(function (user) {
                        var orders = user.myOrders;
                        for(var i=0;i<orders.length;i++){
                            if(orderId===orders[i].id){
                                if(orders[i].status==='Order Placed')
                                    return false;
                                else
                                    return true;
                            }
                        }
                    });
            }
            else if(model.role==='productionHouse'){
                dealerService.findDealerById(userId)
                    .then(function (dealer) {
                        var orders = dealer.myPurchases;
                        for(var i=0;i<orders.length;i++){
                            if(orderId===orders[i].id){
                                if(orders[i].status==='Order Placed')
                                    return false;
                                else
                                    return true;
                            }
                        }
                    });
            }
        }

    }
})();