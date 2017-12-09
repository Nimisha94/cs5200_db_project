(function () {
    angular
        .module('Moviez')
        .controller('MovieController',MovieController);

    function MovieController(movieService, dealerService, userService, $routeParams) {

        var model=this;

        model.userId=$routeParams['userId']
        var movieId=$routeParams['movieId'];

        function init() {
            movieService.getMovie(movieId)
                .then(function (res) {
                    model.movie=res;
                    console.log(res);
                });

            model.dealers = dealerService.findMovie(parseInt(movieId));
        }

        init();

        //event handlers
        model.getNum=getNum;
        model.addToCart=addToCart;

        function getNum(num) {
            var a=[];
            for(var i=0;i<num;i++)
                a.push(i);
            return a;
        }

        function addToCart(dealer, quantity) {
            var d={
                movie: model.movie,
                dealer: dealer,
                quantity: quantity
            };
            userService.addToCart(parseInt(model.userId), d);
        }
    }
})();