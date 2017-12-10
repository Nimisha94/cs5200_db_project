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
                userService.findUserById(parseInt(model.userId))
                    .then(function (user) {
                        console.log(user);
                        model.user = user;
                    })
            }
                //model.user = userService.findUserById(parseInt(model.userId));
            if(model.role==='dealer')
                model.user = dealerService.findDealerById(parseInt(model.userId));
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
            if(model.role==='dealer')
                dealerService.removeFromCart(parseInt(model.userId), cartItem);
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
                    dealerService.addToSoldItems(parseInt(key),dealer_req[key],model.user.myOrders.length,
                        parseInt(model.userId), model.user.address);
                }
                for(var key in dealer_req){
                    for(var i=0;i<dealer_req[key].length;i++){
                        dealerService.updateMovieQuantity(parseInt(key),dealer_req[key][i][0].id,dealer_req[key][i][1]);
                    }
                }
                userService.addToOrder(parseInt(model.userId))
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
                    productionService.addToSoldItems(parseInt(key),prod_req[key],model.user.myPurchases.length,
                        parseInt(model.userId), model.user.dealerLocation);
                }
                for(var key in prod_req){
                    for(var i=0;i<prod_req[key].length;i++){
                        productionService.updateMovieQuantity(parseInt(key),prod_req[key][i][0].id,prod_req[key][i][1]);
                    }
                }
                dealerService.addToOrder(parseInt(model.userId));
            }
            $location.url('/'+model.role+'/'+model.userId+'/orderconfirmation');
        }
    }
})();