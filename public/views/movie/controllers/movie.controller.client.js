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

            model.flag=true;
            model.stock=true;

            movieService.getMovie(movieId)
                .then(function (res) {
                    model.movie=res;
                    console.log(res);
                });

            if(model.role==='user'){
                userService.findUserById(model.userId)
                    .then(function (user) {
                        model.user = user;
                    });

                dealerService.findMovie(parseInt(movieId))
                    .then(function (dealers) {
                        model.dealers = dealers;
                    });
            }
            if(model.role==='dealer') {
                dealerService.findDealerById(model.userId)
                    .then(function (dealer) {
                        model.user = dealer;
                    });

                productionService.findMovie(parseInt(movieId))
                    .then(function (productionhouses) {
                        model.productionhouses = productionhouses;
                    })
            }

            if(model.role==='productionHouse'){
                productionService.findProductionHouseById(model.userId)
                    .then(function (prod) {
                        model.user = prod;
                    });
            }
        }

        init();

        //event handlers
        model.getNum=getNum;
        model.addToCart=addToCart;
        model.addToStock = addToStock;

        function getNum(num) {
            var a=[];
            for(var i=0;i<num;i++)
                a.push(i);
            return a;
        }

        function addToCart(dealer, quantity) {
            model.flag=false;

            if(model.role==='user')
            {
                var d={
                    movie: model.movie,
                    dealer: dealer,
                    quantity: quantity
                };
                userService.addToCart(model.userId, d)
                    .then(function (res) {

                    });
            }
            if(model.role==='dealer'){
                var d={
                    movie: model.movie,
                    productionHouse: dealer,
                    quantity: quantity
                };
            }
                dealerService.addToCart(model.userId, d)
                    .then(function (res) {
                        
                    });
        }
        
        function addToStock(quant, cost) {
            model.stock=false;
            productionService.addToStock(model.userId, model.movie.id, quant, cost)
                .then(function (res) {

                });
        }
    }
})();