(function () {
    angular
        .module('Moviez')
        .controller('SearchMoviesAnonymousController', SearchMoviesAnonymousController);

    function SearchMoviesAnonymousController(movieService, dealerService, userService, productionService, $routeParams) {

        var model = this;


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