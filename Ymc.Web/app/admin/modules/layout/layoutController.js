(function () {
    angular.module(ymcGlobals.appName)
        .controller('layoutController', LayoutController);
    LayoutController.$inject = ['userService', 'personService', '$window', '$location', 'actionItemService', '$scope', '$rootScope', '$state'];
    function LayoutController(userService, personService, $window, $location, actionItemService, $scope, $rootScope, $state) {
        var vm = this;
        vm.currentUser = {};
        vm.userService = userService;
        vm.personService = personService;
        vm.actionItemService = actionItemService;
        vm.$scope = $scope;
        vm.IsAdmin = false; 
        vm.IsStaff = false;
        vm.IsMentee = false;
        vm.IsMentor = false;
        vm.logout = _logout;
        vm.goToMyProfile = _goToMyProfile;
        vm.goToMyHome = _goToMyHome;
        //vm.startTour = _startTour;

        vm.loadActionItems = _loadActionItems;

        _startUp();

        function _logout() {
            vm.userService.logOut()
                .then(_loggedOutComplete, _loggedOutFailed);
        }
        function _loggedOutComplete(data) {
            console.log('logout successful!');
            $window.location.href = '/';
        }
        function _loggedOutFailed(data) {
            console.log('logout failed');
            console.log(data);
        }

        function _startUp() {
            vm.userService.getUserInfo()
                .then(_getUserInfoSuccess, _getUserInfoError);

        }
        function _getUserInfoSuccess(userData) {
            vm.currentUser = userData.item;
            vm.IsAdmin = vm.currentUser && vm.currentUser.roles && vm.currentUser.roles.includes("Admin");
            vm.IsStaff = vm.currentUser && vm.currentUser.roles && vm.currentUser.roles.includes("Staff");
            vm.IsMentee = vm.currentUser && vm.currentUser.roles && vm.currentUser.roles.includes("Mentee");
            vm.IsMentor = vm.currentUser && vm.currentUser.roles && vm.currentUser.roles.includes("Mentor");

            console.log("Logged in as : " + vm.currentUser.firstName + " " + vm.currentUser.lastName);
            _loadActionItems();
        }

        function _getUserInfoError() {
            console.log("There has been an error retrieving the user info!");
        }

        function _goToMyProfile() {
            $state.go('personProfile', { id: vm.currentUser.id });
        }


        //ON ERROR of the LOAD of the Action Items
        function _LoadSuccess(response) {
            console.log(response);
            vm.items = [];
        if (response !== null) {
               for (var i = 0; i < response.length; i++) {
                if (response[i].actionItemStatus.id === 1) {
                    vm.items.push(response[i]);
                }
              }
           }
            
            
        }

        //ON ERROR of the LOAD of the Action Items
        function _LoadError(error) {
            console.log(error);
        }

        $rootScope.$on("LoadActionItems", function () {
            vm.actionItemService.loadActionItemsByPerson(vm.currentUser.id).then(_LoadSuccess, _LoadError);
        });

        function _loadActionItems() {
            vm.actionItemService.loadActionItemsByPerson(vm.currentUser.id).then(_LoadSuccess, _LoadError);
        }

        function _goToMyHome() {
            $state.go('userHome', { id: vm.currentUser.id });
        }

    }

})();