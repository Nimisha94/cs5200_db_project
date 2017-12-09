(function () {
    angular
        .module('Moviez')
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/templates/login.view.client.html',
                controller: 'LoginController',
                controllerAs:'model'
            })
            .when('/register', {
                templateUrl: 'views/home/templates/register.view.client.html',
                controller: 'RegisterController',
                controllerAs:'model'
            })
            .when('/:role/:userId/search', {
                templateUrl: 'views/home/templates/searchmovies-user.view.client.html',
                controller: 'SearchMoviesUserController',
                controllerAs:'model'
            })
            .when('/user/:userId/movie/:movieId', {
                templateUrl: 'views/movie/templates/movie.view.client.html',
                controller: 'MovieController',
                controllerAs:'model'
            })
            .when('/user/:userId/cart', {
                templateUrl: 'views/home/templates/cart.view.client.html',
                controller: 'CartController',
                controllerAs:'model'
            })
            .when('/user/:userId/orderconfirmation', {
                templateUrl: 'views/home/templates/order-confirm.view.client.html',
                controller: 'OrderConfirmController',
                controllerAs:'model'
            })
            .when('/user/:userId/order', {
                templateUrl: 'views/home/templates/order.view.client.html',
                controller: 'OrderController',
                controllerAs:'model'
            })
            .when('/user/:userId/soldItems', {
                templateUrl: 'views/home/templates/sold-items.view.client.html',
                controller: 'SoldItemsController',
                controllerAs:'model'
            })
    }
})();