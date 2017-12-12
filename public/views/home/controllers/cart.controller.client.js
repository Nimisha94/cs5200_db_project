(function () {
    angular
        .module('Moviez')
        .controller('CartController',CartController);

    function CartController(userService, dealerService, productionService, $routeParams, $location, $route) {

        var model=this;

        model.role = $routeParams['role'];
        model.userId = $routeParams['userId'];

        function init() {
            if(model.role==='user'){
                userService.findUserById(model.userId)
                    .then(function (user) {
                        console.log(user);
                        model.user = user;
                    })
            }
                //model.user = userService.findUserById(parseInt(model.userId));
            if(model.role==='dealer'){
                dealerService.findDealerById(model.userId)
                    .then(function (dealer) {
                        console.log(dealer);
                        model.user = dealer;
                    })
            }

        }

        init();
        
        //event handlers
        model.removeFromCart = removeFromCart;
        model.placeOrder = placeOrder;
        
        function removeFromCart(cartItem) {
            if(model.role==='user'){
                userService.removeFromCart(parseInt(model.userId), cartItem)
                    .then(function (response) {
                        $route.reload();
                    });
            }
                //userService.removeFromCart(parseInt(model.userId),cartItem);
            if(model.role==='dealer'){
                dealerService.removeFromCart(parseInt(model.userId), cartItem)
                    .then(function (response) {
                        $route.reload();
                    });
            }

        }

        function placeOrder() {
            console.log(model.user.cart);
            if(model.role==='user'){
                var dealer_req={};
                for(var i=0;i<model.user.cart.length;i++){
                    if(model.user.cart[i].dealer.dealerId in dealer_req){
                        dealer_req[model.user.cart[i].dealer.dealerId].push([model.user.cart[i].movie, model.user.cart[i].quantity]);
                    }
                    else{
                        dealer_req[model.user.cart[i].dealer.dealerId]=[[model.user.cart[i].movie, model.user.cart[i].quantity]];
                    }
                }
                console.log(dealer_req);
                for(var key in dealer_req){
                    
                    dealerService.addToSoldItems(key,dealer_req[key],model.user.myOrders.length,
                        model.userId, model.user.address)
                        .then(function (response) {

                        });
                }
                for(var key in dealer_req){
                    for(var i=0;i<dealer_req[key].length;i++){
                        dealerService.updateMovieQuantity(key,dealer_req[key][i][0].id,dealer_req[key][i][1])
                            .then(function (response) {
                                
                            });
                    }
                }
                userService.addToOrder(model.userId)
                    .then(function (response) {

                    });
            }
            else if(model.role==='dealer'){
                var prod_req={};
                for(var i=0;i<model.user.cart.length;i++){
                    if(model.user.cart[i].productionHouse.productionHouseId in prod_req){
                        prod_req[model.user.cart[i].productionHouse.productionHouseId].push([model.user.cart[i].movie, model.user.cart[i].quantity]);
                    }
                    else{
                        prod_req[model.user.cart[i].productionHouse.productionHouseId]=[[model.user.cart[i].movie, model.user.cart[i].quantity]];
                    }
                }
                console.log(prod_req);
                for(var key in prod_req){
                    productionService.addToSoldItems(key,prod_req[key],model.user.myPurchases.length,
                        model.userId, model.user.dealerLocation);
                }
                for(var key in prod_req){
                    for(var i=0;i<prod_req[key].length;i++){
                        productionService.updateMovieQuantity(key,prod_req[key][i][0].id,prod_req[key][i][1]);
                    }
                }
                dealerService.addToOrder(model.userId)
                    .then(function (response) {

                });
            }
            $location.url('/'+model.role+'/'+model.userId+'/orderconfirmation');
        }
    }
})();