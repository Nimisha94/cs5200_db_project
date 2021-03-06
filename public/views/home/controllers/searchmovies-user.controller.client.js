(function () {
    angular
        .module('Moviez')
        .controller('SearchMoviesUserController', SearchMoviesUserController);

    function SearchMoviesUserController(movieService, dealerService, userService, productionService, $routeParams) {

        var model = this;

        model.userId = $routeParams['userId'];
        model.role = $routeParams['role'];

        function init() {
            if(model.role==='user'){
                userService.findUserById(model.userId)
                    .then(function (user) {
                        console.log(user);
                        model.user = user;
                    });
            }
                //model.user = userService.findUserById(parseInt(model.userId));
            else if(model.role==='dealer'){
                dealerService.findDealerById(model.userId)
                    .then(function (dealer) {
                        console.log(dealer);
                        model.user = dealer;
                    });
            }

            else if(model.role==='productionHouse')
                productionService.findProductionHouseById(model.userId)
                    .then(function (prod) {
                        console.log(prod);
                        model.user = prod;
                    });
        }

        init();

        //event handlers
        model.search = search;

        function search(searchtext) {
            movieService.searchMovies(searchtext)
                .then(function (res) {
                    model.movies=res.results;
                    console.log(res);
                });
        }

    }
})();