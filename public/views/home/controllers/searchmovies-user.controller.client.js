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
                userService.findUserById(parseInt(model.userId))
                    .then(function (user) {
                        console.log(user);
                        model.user = user;
                    });
            }
                //model.user = userService.findUserById(parseInt(model.userId));
            else if(model.role==='dealer')
                model.user = dealerService.findDealerById(parseInt(model.userId));
            else if(model.role==='productionHouse')
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