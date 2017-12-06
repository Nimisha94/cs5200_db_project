(function () {
    angular
        .module('Moviez')
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home/login.html',
                //controller: 'HomeController',
                //controllerAs:'model'
            })
            .when('/register', {
                templateUrl: 'home/register.html',
                //controller: 'HomeController',
                //controllerAs:'model'
            })
    }
})();