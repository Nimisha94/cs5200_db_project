(function () {
    angular
        .module('Moviez')
        .controller('MovieController',MovieController);

    function MovieController(movieService, dealerService, userService, productionService, $routeParams) {

        var model=this;

        model.role = $routeParams['role'];
        model.userId = $routeParams['userId']
        var movieId = $routeParams['movieId'];

        function init() {

            movieService.getMovie(movieId)
                .then(function (res) {
                    model.movie=res;
                    console.log(res);
                });

            if(model.role==='user')
                model.dealers = dealerService.findMovie(parseInt(movieId));
            if(model.role==='dealer')
                model.productionhouses = productionService.findMovie(parseInt(movieId));
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

            if(model.role==='user')
            {
                var d={
                    movie: model.movie,
                    dealer: dealer,
                    quantity: quantity
                };
                userService.addToCart(parseInt(model.userId), d);
            }
            if(model.role==='dealer'){
                var d={
                    movie: model.movie,
                    productionHouse: dealer,
                    quantity: quantity
                };
            }
                dealerService.addToCart(parseInt(model.userId), d);
        }
    }
})();