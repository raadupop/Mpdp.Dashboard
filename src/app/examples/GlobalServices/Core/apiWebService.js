/**
 * Created by Radu  Pop on 5/12/2016.
 */
(function () {
    'use strict';

    angular.module('app').factory('ApiWebService', apiWebService);

    /* @ngInject */
    function apiWebService($http, $log, $state){

        function get(url, config, success, failure){
            return $http.get(url, config)
                .then(function(result){
                     success(result);
                },function(error){
                    if(error.status == '401'){
                        $state.go('authentication.login');
                    }

                    else if (failure != null) {
                        failure(error);
                    }
                });
        }

        function post(url, data, success, failure) {
            return $http.post(url, data)
                .then(function (result) {
                    success(result);
                }, function (error) {
                    if (error.status == '401') {
                        $state.go('authentication.login');
                    }
                    else if (failure != null) {
                        failure(error);
                    }
                });
        }

        function put(url, data, success, failure) {
            return $http.put(url, data)
                .then(function (result) {
                    success(result);
                }, function (error) {
                    if (error.status == '401') {
                        $state.go('authentication.login');
                    }
                    else if (failure != null) {
                        failure(error);
                    }
                });
        }

        function deleteData(url, config, success, failure){
            return $http.delete(url, config)
                .then(function (result){
                    success(result);
                }, function (error) {
                    if (error.status =='401'){
                        $state.go('authentication.login');
                    }
                    else if (failure != null) {
                        failure(error)
                    }
                })
        }

        return {
            get: get,
            post: post,
            put: put,
            deleteData: deleteData
        };
    }



})();
