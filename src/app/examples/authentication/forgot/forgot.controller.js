(function() {
    'use strict';

    angular
        .module('app.examples.authentication')
        .controller('ForgotController', ForgotController);

    /* @ngInject */
    function ForgotController($scope, $state, $mdToast, $filter, $http, triSettings, ApiWebService, ApiConfig) {
        var vm = this;
        vm.triSettings = triSettings;
        vm.user = {
            email: ''
        };
        vm.resetClick = resetClick;

        ////////////////

        function resetClick() {
            var data = '';

            ApiWebService.put(ApiConfig + 'account/recoverpassword?email=' + vm.user.email, data, success, failed);

            function success(result){
                $mdToast.show(
                    $mdToast.simple()
                        .content(result.data)
                        .position('bottom right')
                        .hideDelay(1500)
                );
            }

            function failed(result){
                $mdToast.show(
                    $mdToast.simple()
                        .content(result.data)
                        .position('bottom right')
                        .hideDelay(1500)
                );
            }
        }
    }
})();
