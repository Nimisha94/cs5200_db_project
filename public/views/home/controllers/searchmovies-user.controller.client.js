(function () {
    angular
        .module('Moviez')
        .controller('SearchMoviesUserController', SearchMoviesUserController);

    function SearchMoviesUserController(movieService, dealerService, userService, productionService, $routeParams) {

        var model = this;

        model.userId = $routeParams['userId'];
        model.role = $routeParams['role'];

        function init() {
            if(model.role==='user')
                model.user = userService.findUserById(parseInt(model.userId));
            else if(model.role==='dealer')
                model.user = dealerService.findDealerById(parseInt(model.userId));
            else if(model.role==='productionhouse')
                model.user = productionService.findProductionHouseById(parseInt(model.userId));
                console.log(model.user);
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