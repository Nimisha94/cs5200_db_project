(function () {
    angular
        .module('Moviez')
        .controller('MovieAnonymousController',MovieAnonymousController);

    function MovieAnonymousController(movieService, dealerService, userService, productionService, $routeParams) {

        var model=this;

        var movieId = $routeParams['movieId'];

        function init() {

            movieService.getMovie(movieId)
                .then(function (res) {
                    model.movie=res;
                    console.log(res);
                });
        }

        init();

        //event handlers
        model.getNum=getNum;

        function getNum(num) {
            var a=[];
            for(var i=0;i<num;i++)
                a.push(i);
            return a;
        }

    }
})();