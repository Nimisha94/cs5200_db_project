(function () {
    angular
        .module('Moviez')
        .controller('OrderController', OrderController);

    function OrderController(userService, $routeParams) {

        var model = this;
        model.userId = $routeParams['userId'];

        function init() {
            model.user = userService.findUserById(parseInt(model.userId));
        }

        init();
    }
})();