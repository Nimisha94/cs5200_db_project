(function () {
    angular
        .module('Moviez')
        .controller('AdminController', AdminController);

    function AdminController(userService, dealerService, productionService, $route) {
        var model = this;

        function init() {

            userService.findAllUsers()
                .then(function (users) {
                    model.users = users;
                });

            dealerService.findAllDealers()
                .then(function (dealers) {
                    model.dealers = dealers;
                });

            productionService.findAllProds()
                .then(function (prods) {
                    model.prods = prods;
                })
        }

        init();

        model.getUser = getUser;
        model.deleteUser = deleteUser;
        model.createUser = createUser;
        model.updateUser = updateUser;

        model.getDealer = getDealer;
        model.deleteDealer = deleteDealer;
        model.createDealer = createDealer;
        model.updateDealer = updateDealer;

        model.getProd = getProd;
        model.deleteProd = deleteProd;
        model.createProd = createProd;
        model.updateProd = updateProd;

        function getUser(userId) {
            userService.findUserById(userId)
                .then(function (user) {
                    model.user = user;
                });
        }

        function deleteUser(userId) {
            userService.deleteUser(userId)
                .then(function (res) {
                    $route.reload();
                });
        }

        function createUser() {
            model.user.role='user';
            model.user.cart=[];
            model.user.myOrders=[];
            userService.register(model.user)
                .then(function (response) {
                    $route.reload();
                });
        }
        
        function updateUser() {
            userService.updateUser(model.user)
                .then(function (resp) {
                    $route.reload();
                });
        }

        function getDealer(dealerId) {
            dealerService.findDealerById(dealerId)
                .then(function (dealer) {
                    model.dealer = dealer;
                });
        }

        function deleteDealer(dealerId) {
            dealerService.deleteDealer(dealerId)
                .then(function (res) {
                    $route.reload();
                });
        }

        function createDealer() {
            model.dealer.role='dealer';
            model.dealer.cart=[];
            model.dealer.myPurchases=[];
            dealerService.register(model.dealer)
                .then(function (response) {
                    $route.reload();
                });
        }

        function updateDealer() {
            dealerService.updateDealer(model.dealer)
                .then(function (resp) {
                    $route.reload();
                });
        }

        function getProd(prodId) {
            productionService.findProductionHouseById(prodId)
                .then(function (prod) {
                    model.prod = prod;
                });
        }

        function deleteProd(prodId) {
            productionService.deleteProd(prodId)
                .then(function (res) {
                    $route.reload();
                });
        }

        function createProd() {
            model.prod.role='productionHouse';
            model.prod.cart=[];
            model.prod.mySoldItems=[];
            productionService.register(model.prod)
                .then(function (response) {
                    $route.reload();
                });
        }

        function updateProd() {
            productionService.updateProd(model.prod)
                .then(function (resp) {
                    $route.reload();
                });
        }

    }
})();