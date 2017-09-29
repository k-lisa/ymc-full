(function () {
    "use strict";

    angular.module(ymcGlobals.appName, [
        'ui.router'
    ]);

    angular.module(ymcGlobals.appName).config(configure);
    angular.module(ymcGlobals.appName).value("moment", moment);
    configure.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

    function configure($stateProvider, $locationProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/badRoute');

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });

        $stateProvider.state({
                name: 'badRoute',
                component: 'badRoute',
                url: '/badRoute'
            });

        $stateProvider.state({
            name: 'accounts',
            component: 'accounts',
            url: '/'
        });

        $stateProvider.state({
            name: 'sessionMenteeRsvp',
            component: 'sessionMenteeRsvp',
            url: '/sessionRsvp/session:sessionId/sessionMentee:sessionMenteeId'
        });

        $stateProvider.state({
            name: 'sessionMentorRsvp',
            component: 'sessionMentorRsvp',
            url: '/sessionRsvp/session:sessionId/sessionMentor:sessionMentorId'
        });

        $stateProvider.state('confirmationPages', {
            name: 'confirmationPages',
            component: 'confirmationPages',
            url: '/confirmationPages'
        });



    }


})();