(function () {
    "use strict"

    angular.module(ymcGlobals.appName)
        .component('inAppChat',
        {
            templateUrl: '/app/admin/modules/inAppChat/inAppChat.html',
            controller: 'chatController',
            controllerAs: 'c'
        });

})();