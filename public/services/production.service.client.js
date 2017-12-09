(function () {
    angular
        .module('Moviez')
        .factory('productionService', productionService);

    function productionService($http) {

        var productionhouses=[];

        var api={
            register: register,
            login: login,
            findProductionHouseById: findProductionHouseById
        };

        return api;

        function register(productionhouse) {
            productionhouses.push(productionhouse);
            console.log(productionhouses);
            return productionhouse;
        }

        function login(username, password) {
            for(var i=0;i<productionhouses.length;i++){
                if(productionhouses[i].username===username && productionhouses[i].password===password){
                    return productionhouses[i];
                }
            }
            return null;
        }

        function findProductionHouseById(prodId) {
            for(var i=0;i<productionhouses.length;i++){
                if(productionhouses[i].id===prodId){
                    return productionhouses[i];
                }
            }
        }

    }
})();