(function () {
    "use strict";

    angular
        .module(ymcGlobals.appName)
        .factory('languageService', languageService);
    ethnicityService.$inject = ['$http', '$q', 'baseCrudService'];

    function languageService($http, $q, baseCrudService) {
        const apiUrl = "/api/language";
        return {
            getAll: _getAll,
            getById: _getById,
            postLanguage: _post,
            put: _put,
            delete: _delete
        };

        function _getAll() {
            return baseCrudService.getAll(apiUrl);
        }

        function _getById(id) {
            return baseCrudService.getById(apiUrl, id);
        }

        function _post(postRequest) {
            return baseCrudService.post(apiUrl, postRequest);
        }

        function _put(putRequest) {
            return baseCrudService.put(apiUrl, putRequest, putRequest.id);
        }

        function _delete(id) {
            return baseCrudService.delete(apiUrl, id)
        }

    }


})();
