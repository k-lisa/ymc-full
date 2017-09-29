(function () {
    angular.module(ymcGlobals.appName)
        .factory('educationService', educationService);
    educationService.$inject = ['$http', '$q'];

    var apiUrl = "/api/EducationLevels";

    function educationService($http, $q) {
        function _postEducation(userData) {
            var settings = {
                url: apiUrl,
                method: 'POST',
                cache: false,
                responseType: 'json',
                contentType: 'application/json; charset=UTF-8',
                withCredentials: true,
                data: JSON.stringify(userData)
            };
            return $http(settings)
                .then(_submitComplete, _submitFailed);
        }
        function _submitComplete(response) {
            console.log("Ajax successfull");
            console.log(response.data);
            return response.data;

        }
        function _submitFailed(error) {
            console.log("Ajax error");
            console.log(error);
            return $q.reject(error);
        }
        function _getAll() {
            var settings = {
                url: apiUrl,
                method: 'GET',
                withCredentials: true,
                cache: false,
                responseType: 'json'
            };
            return $http(settings)
                .then(_getAllComplete, _getAllFailed);
        }

        function _getAllComplete(response) {
            return response.data;
        }

        function _getAllFailed(error) {
            var msg = 'Failed to retrieve education';
            if (error.data && error.data.description) {
                msg += '\n' + error.data.description;
            }
            error.data.description = msg;
            return $q.reject(error);
        }
        function _put(item) {
            var settings = {
                url: apiUrl+"/" + item.id,
                method: 'PUT',
                withCredentials: true,
                cache: false,
                responseType: 'json',
                contentType: 'application/json; charset=UTF-8',
                data: JSON.stringify(item)
            };
            return $http(settings)
                .then(_putComplete, _putFailed);
        }

        function _putComplete(response) {
            return response.data;
        }

        function _putFailed(error) {
            console.log("Error")
        }
        function _getById(id) {
            var settings = {
                url: apiUrl+"/" + id,
                method: 'GET',
                withCredentials: true,
                cache: false,
                responseType: 'json'
            };
            return $http(settings)
                .then(_getByIdComplete, _getByIdFailed);
        }

        function _getByIdComplete(response) {
            console.log("Get By Id successfull!")
            return response.data;
        }

        function _getByIdFailed(error) {
            console.log("Get by Id failed!")
        }
        function _delete(id) {
            var settings = {
                url: apiUrl + "/" + id,
                method: 'DELETE',
                withCredentials: true,
                cache: false,
            };
            return $http(settings)
                .then(_deleteComplete, _deleteFailed);
        }
        function _deleteComplete(response) {
            console.log("Delete successfull");
            return response.data;
        }
        function _deleteFailed() {
            console.log("Delete Failed");
        }
        return {
            postLanguage: _postEducation,
            getAll: _getAll,
            put: _put,
            getById: _getById,
            delete: _delete
        };

    }
})();