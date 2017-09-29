(function () {
    "use strict";

    angular.module(ymcGlobals.appName, [
        'ui.router', 'mp.datePicker', 'xeditable', 'uiCropper',
        'ui.bootstrap.datetimepicker', 'ui.dateTimeInput',
        'summernote', 'ui.calendar', 'ngTouch', 'ui.bootstrap', 
        'ngPrint', 'ngFileUpload',
        'ngSanitize', 'ngCsv', 'ngDraggable', 'SignalR'
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
            name: 'activities',
            component: 'activities',
            url: '/activities'
        });

        $stateProvider.state({
            name: 'appointmentTypes',
            component: 'appointmentTypes',
            url: '/appointmentTypes'
        });

        $stateProvider.state({
            name: 'directiveHosts',
            component: 'directiveHosts',
            url: '/directiveHosts'
        });

        $stateProvider.state({
            name: 'directions',
            component: 'directions',
            url: '/directions'
        });

        $stateProvider.state({
            name: 'emails',
            component: 'emails',
            url: '/emails'
        });

        $stateProvider.state({
            name: 'ethnicities',
            component: 'ethnicities',
            url: '/ethnicities'
        });

        $stateProvider.state({
            name: 'interests',
            component: 'interests',
            url: '/interests'
        });

        $stateProvider.state({
            name: 'languages',
            component: 'languages',
            url: '/languages'
        });

        $stateProvider.state({
            name: 'doThings',
            component: 'doThings',
            url: '/doThings'
        });

        $stateProvider.state({
            name: 'doThingCategories',
            component: 'doThingCategories',
            url: '/doThingCategories'
        });

        $stateProvider.state({
            name: 'doThingLocations',
            component: 'doThingLocations',
            url: '/doThingLocations'
        });

        $stateProvider.state({
            name: 'offices',
            component: 'offices',
            url: '/offices'

        });

        $stateProvider.state({
            name: 'personFiles',
            component: 'personFiles',
            url: '/personFiles'
        });

        $stateProvider.state({
            name: 'personalities',
            component: 'personalities',
            url: '/personalities'

        });

        $stateProvider.state({
            name: 'programs',
            component: 'programs',
            url: '/programs'
        });

        $stateProvider.state({
            name: 'programDetails',
            component: 'programDetails',
            url: '/programDetails/?{id}'
        });

        $stateProvider.state({
            name: 'programMents',
            component: 'programMents',
            url: '/programMents/{programId}'
        });

        $stateProvider.state({
            name: 'programMents.sessions',
            component: 'programMentSessions',
            url: '/sessions'
        });

        $stateProvider.state({
            name: 'programMentees',
            component: 'programMentees',
            url: '/programMentees/?{id}'
        });
        $stateProvider.state('equipments', {
            name: 'equipments',
            component: 'equipments',
            url: '/equipments'
        });

        $stateProvider.state({
            name: 'roles',
            component: 'roles',
            url: '/roles'
        });

        $stateProvider.state({
            name: 'surveys',
            component: 'surveys',
            url: '/surveys/{id}/{programId}'
        });

        $stateProvider.state({
            name: 'companies',
            component: 'companies',
            url: '/companies'
        });

        $stateProvider.state({
            name: 'companiesManage',
            component: 'companiesManage',
            url: '/companiesManage?{id}'
        });

        $stateProvider.state({
            name: 'companiesManagePeople',
            component: 'companiesManagePeople',
            url: '/companiesManagePeople'
        });

        $stateProvider.state({
            name: 'fileUploads',
            component: 'fileUploads',
            url: '/fileUploads'
        });

        $stateProvider.state({
            name: 'manageSurveys',
            component: 'manageSurveys',
            url: '/manageSurveys'
		});

        $stateProvider.state({
            name: 'educationLevels',
            component: 'educationLevels',
            url: '/educationLevels'
        });
        $stateProvider.state({
            name: 'actionItems',
            component: 'actionItems',
            url: '/actionItem/?{id}'
        });

        $stateProvider.state({
            name: 'sessions',
            component: 'sessions',
            url: '/sessions'
        });

        $stateProvider.state({
            name: 'sessionTypes',
            component: 'sessionTypes',
            url: '/sessionTypes'
        });

        $stateProvider.state({
            name: 'sessionForm',
            component: 'sessionForm',
            url: '/sessionForm/?{programId}&{id}'
        });

        $stateProvider.state({
            name: 'personList',
            component: 'personList',
            url: '/personList'
        });

        $stateProvider.state({
            name: 'personProfile',
            component: 'personProfile',
            url: '/personProfile/:id'
        });

        $stateProvider.state({
            name: 'programStaff',
            component: 'programStaff',
            url: '/programStaff/?{id}'
        });

        $stateProvider.state({
            name: 'schools',
            component: 'schools',
            url: '/schools'
        });

        $stateProvider.state({
            name: 'schoolDetails',
            component: 'schoolDetails',
            url: '/schoolDetails/?{id}'
        });

        $stateProvider.state({
            name: 'sms',
            component: 'sms',
            url: '/sms'
        });

        $stateProvider.state({
            name: 'personRoles',
            component: 'personRoles',
            url: '/personRoles'
        });

        $stateProvider.state({
            name: 'transportationBreakdown',
            component: 'transportationBreakdown',
            url: '/transportationBreakdown/?{id}'
        });

		$stateProvider.state({
			name: 'sessionDetail',
			component: 'sessionDetail',
			url: '/session/{id}/details'
		});

        $stateProvider.state({
            name: 'sessionStaffs',
            component: 'sessionStaffs',
            url: '/sessionStaffs/?{id}'
        });

		$stateProvider.state({
			name: 'userHome',
			component: 'userHome',
			url: '/userHome/:id'
        });


        $stateProvider.state({
            name: 'checklistItems',
            component: 'checklistItems',
            url: '/checklistItems/{id}'
        });

        $stateProvider.state({
            name: 'checklistCategories',
            component: 'checklistCategories',
            url: '/checklistCategories'
        });

        $stateProvider.state({
            name: 'checklists',
            component: 'checklists',
            url: '/checklists'
        });

        $stateProvider.state({
            name: 'inAppChat',
            component: 'inAppChat',
            url: '/inAppChat'
        });
    }

})();