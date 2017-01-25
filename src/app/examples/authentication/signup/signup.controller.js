(function() {
    'use strict';

    angular
        .module('app.examples.authentication')
        .controller('SignupController', SignupController);

    /* @ngInject */
    function SignupController($state, ApiWebService, ApiConfig, $mdToast, $filter, triSettings) {
        var vm = this;
        vm.triSettings = triSettings;
        vm.signupClick = signupClick;
        vm.user = {
            name: '',
            user: '',
            email: '',
            password: '',
            confirm: ''
        };

        ////////////////

        function signupClick() {

            ApiWebService.post(ApiConfig + 'account/register', vm.user, handleSuccess, handleFailed);


                //if (response.success) {
            //        $mdToast.show(
            //            $mdToast.simple()
            //                .content($filter('translate')('SIGNUP.MESSAGES.CONFIRM_SENT'))
            //                .position('bottom right')
            //                .action($filter('translate')('SIGNUP.MESSAGES.LOGIN_NOW'))
            //                .highlightAction(true)
            //                .hideDelay(0)
            //        ).then(function (){
            //                $state.go('public.auth.login');
            //            });
            //    } else {
            //        $mdToast.show(
            //            $mdToast.simple()
            //                .content(resutlt)
            //                .position('bottom right')
            //                .hideDelay(5000)
            //        );
            //    }
            //});
        }

        function handleSuccess(){
            $state.go('authentication.login');
        }

        function handleFailed(){
            //todo handle a "user exist context"
            $mdToast.show(
                $mdToast.simple()
                    .content("The web service can't complete your request")
                    .position('bottom right')
                    .hideDelay(5000)
            )
        }
    }
})();
