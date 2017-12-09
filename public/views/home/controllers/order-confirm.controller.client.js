(function () {
    angular
        .module('Moviez')
        .controller('OrderConfirmController', OrderConfirmController);

    function OrderConfirmController($routeParams) {

        var model = this;
        model.userId = $routeParams['userId'];

    }
})();