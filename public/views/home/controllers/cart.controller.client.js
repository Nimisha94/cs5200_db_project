(function () {
    angular
        .module('Moviez')
        .controller('CartController',CartController);

    function CartController(userService, dealerService, $routeParams, $location) {

        var model=this;

        model.userId = $routeParams['userId'];

        function init() {
            model.user = userService.findUserById(parseInt(model.userId));
        }

        init();
        
        //event handlers
        model.removeFromCart = removeFromCart;
        model.placeOrder = placeOrder;
        
        function removeFromCart(cartItem) {
            userService.removeFromCart(parseInt(model.userId),cartItem);
        }

        function placeOrder() {
            var dealer_req={};
            console.log(model.user.cart);
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
            userService.addToOrder(parseInt(model.userId));
            $location.url('/user/'+model.userId+'/orderconfirmation');
        }
    }
})();