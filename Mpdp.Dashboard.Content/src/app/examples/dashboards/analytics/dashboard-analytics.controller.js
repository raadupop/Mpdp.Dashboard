(function() {
    'use strict';

    angular
        .module('app.examples.dashboards')
        .controller('DashboardAnalyticsController', DashboardAnalyticsController);

    /* @ngInject */
    function DashboardAnalyticsController($scope, $timeout, $mdToast, $rootScope, $state, ApiWebService, ApiConfig) {
        var vm = this;

        $timeout(function() {
            $rootScope.$broadcast('newMailNotification');
            $mdToast.show({
                template: '<md-toast><span flex>You have new email messages! View them <a href="" ng-click=vm.viewUnread()>here</a></span></md-toast>',
                controller: newMailNotificationController,
                controllerAs: 'vm',
                position: 'bottom right',
                hideDelay: 5000
            });

        }, 10000);

        function getData(){

            var config = {
                params: {
                    userProfileId: $rootScope.globals.currentUser.userProfileId
                }
            };

            ApiWebService.get(ApiConfig + 'analytics/getgoalsstatistics', config, success, failed);

            function success(result){
                vm.statistics = result.data;
            }

            function failed(result){
                $mdToast.simple()
                    .content(result.data.Message)
                    .position('bottom right')
                    .hideDelay(2000)
            }
        }

        getData();

        //////////////

        function newMailNotificationController() {
            var vm = this;
            vm.viewUnread = function() {
                $state.go('admin-panel-email-no-scroll.email.inbox');
            };

        }
    }
})();
