(function () {
    "use strict"

    angular.module(ymcGlobals.appName)
        .component('languages',
        {
            templateUrl: '/app/admin/modules/languages/language.html',
            controller: 'languageController',
            controllerAs: 'lan'
        })


})();