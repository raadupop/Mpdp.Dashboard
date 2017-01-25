(function() {
    'use strict';

    angular
        .module('app.examples.authentication')
        .controller('ProfileController', ProfileController);

    /* @ngInject */
    function ProfileController(ApiWebService, ApiConfig, $rootScope, $mdToast, AuthenticationService) {
        var vm = this;

        vm.updatePassword = updatePassword;
        vm.updateInformation = updateInformation;

        vm.settingsGroups = [{
            name: 'ADMIN.NOTIFICATIONS.ACCOUNT_SETTINGS',
            settings: [{
                title: 'ADMIN.NOTIFICATIONS.SHOW_LOCATION',
                icon: 'zmdi zmdi-pin',
                enabled: true
            },{
                title: 'ADMIN.NOTIFICATIONS.SHOW_AVATAR',
                icon: 'zmdi zmdi-face',
                enabled: false
            },{
                title: 'ADMIN.NOTIFICATIONS.SEND_NOTIFICATIONS',
                icon: 'zmdi zmdi-notifications-active',
                enabled: true
            }]
        },{
            name: 'ADMIN.NOTIFICATIONS.CHAT_SETTINGS',
            settings: [{
                title: 'ADMIN.NOTIFICATIONS.SHOW_USERNAME',
                icon: 'zmdi zmdi-account',
                enabled: true
            },{
                title: 'ADMIN.NOTIFICATIONS.SHOW_PROFILE',
                icon: 'zmdi zmdi-account-box',
                enabled: false
            },{
                title: 'ADMIN.NOTIFICATIONS.ALLOW_BACKUPS',
                icon: 'zmdi zmdi-cloud-upload',
                enabled: true
            }]
        }];

        vm.user = {
            id: '',
            userId: '',
            name: '',
            email: '',
            username: '',
            location: '',
            details: 'Mocked...todo!!',
            current: '',
            password: '',
            confirm: ''
        };

        // init
        getUserProfile();


        function getUserProfile(){
            var config = {
                params: {
                    username: $rootScope.globals.currentUser.username
                }
            };

            ApiWebService.get(ApiConfig + 'userprofile/getprofile', config, handleSuccess, handleFailed);

            function handleSuccess(result){
                vm.user.name = result.data.Name;
                vm.user.username = result.data.Username;
                vm.user.email = result.data.Email;
                vm.user.id = result.data.Id;
                vm.user.userId = result.data.UserId;
                vm.user.location = result.data.Location;


            }

            function handleFailed(){
                $mdToast.show(
                    $mdToast.simple()
                        .content("Something wrong with api service. Try again")
                        .position('bottom right')
                        .hideDelay(1500)
                );
            }
        }


        function updatePassword(){
            var user = {
                    username: vm.user.username,
                    currentPassword: vm.user.current,
                    newPassword: vm.user.password
            };

            ApiWebService.post(ApiConfig + 'account/updatepasswrod', user, success, failed);

            function success(){
                var userWithNewPassword = {
                    username: user.username,
                    password: user.newPassword
                };

                var userProfileId = $rootScope.globals.currentUser.userProfileId;

                AuthenticationService.clearCredentials();
                AuthenticationService.setCredentials(userWithNewPassword, userProfileId);

                $mdToast.show(
                    $mdToast.simple()
                        .content("The password was updated with success")
                        .position('bottom right')
                        .hideDelay(1500)
                )

            }

            function failed(result){
                $mdToast.show(
                    $mdToast.simple()
                        .content(result.data.toString)
                        .position('bottom right')
                        .hideDelay(1500)
                )
            }
        }

        function updateInformation(){

            ApiWebService.post(ApiConfig + 'userprofile/updateprofile', vm.user, success, failed);

            function success(){
                $mdToast.show(
                    $mdToast.simple()
                        .content("The information was successfully updated")
                        .position('bottom right')
                        .hideDelay(1500)
                );
            }

            function failed(result){
                $mdToast.show(
                    $mdToast.simple()
                        .content(result.data.toString)
                        .position('bottom right')
                        .hideDelay(1500)
                );
            }
        }
    }
})();
