(function () {
    "use strict"

    angular.module(ymcGlobals.appName)
        .component('accounts',
        {
            templateUrl: '/app/public/modules/accounts/account.html',
            controller: 'accountController',
            controllerAs: 'ac'
        })


})();