(function () {
    "use strict"

    angular.module(ymcGlobals.appName)
        .component('educationLevels',
        {
            templateUrl: '/app/admin/modules/educationLevels/educationLevel.html',
            controller: 'educationLevelController',
            controllerAs: 'eCon'
        });

})();