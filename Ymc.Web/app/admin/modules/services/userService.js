(function () {
    angular.module(ymcGlobals.appName)
        .factory('userService', userService);
    userService.$inject = ['$http', '$q'];
    function userService($http, $q) {
        return {
            getUserInfo: _getUserInfo,
            logOut: _logOut

        };
        function _getUserInfo() {
            var settings = {
                url: "/api/accounts/user",
                method: 'GET',
                withCredentials: true,
                cache: false,
                responseType: 'json'
            };
            return $http(settings)
                .then(_getUserComplete, _getUserFailed);
        }
        function _getUserComplete(response) {
            return response.data;
        }
        function _getUserFailed(error) {
            return $q.reject(error);

        }
        function _logOut() {
            var settings = {
                url: "/api/accounts/logout",
                method: 'GET',
                withCredentials: true,
                cache: false,
                responseType: 'json'
            };
            return $http(settings)
                .then(_getLoggedOutComplete, _getLoggedOutFailed);
        }
        function _getLoggedOutComplete(response) {
            return response.data;
        }
        function _getLoggedOutFailed(error) {
            return $q.reject(error);
        }
    }
})();
