(function () {
    'use strict';

    angular
        .module('app')
        .factory('RoupaService', Service);

    function Service($http, $q) {
        var apiURL = "http://localhost:9050/api/roupas";
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        
        return service;

        function GetAll() {
            return $http.get(apiURL).then(handleSuccess, handleError);
        }

        function GetById(_id) {
            return $http.get(apiURL + '/' + _id).then(handleSuccess, handleError);
        }

        function Create(roupa) {
            return $http.post(apiURL, roupa).then(handleSuccess, handleError);
        }

        function Update(roupa) {
            return $http.put(apiURL + '/' + roupa._id, roupa).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete(apiURL + '/' + _id).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
        
    }

})();
