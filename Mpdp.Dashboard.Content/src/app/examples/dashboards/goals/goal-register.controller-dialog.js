/**
 * Created by Radu  Pop on 5/25/2016.
 */
(function(){
    'use strict';

    angular
        .module('app.examples.dashboards')
        .controller('GoalRegisterController', GoalRegisterController);

    /* @ngInject */
    function GoalRegisterController(triSettings, GoalsService, $rootScope, $mdToast, $mdDialog) {
        var vm = this;
        vm.registerClick = registerClick;
        vm.triSettings = triSettings;
        vm.okClick = okClick;
        vm.cancelClick = cancelClick;

        // todo validation !!
        vm.goal = {
            name: '',
            description: '',
            estimation: ''
        };

        function okClick() {
            $mdDialog.hide();
        }

        function cancelClick() {
            $mdDialog.cancel();
        }

        function registerClick(){

            var goalToSend = {
                username: $rootScope.globals.currentUser.username,
                userProfileId: $rootScope.globals.currentUser.userProfileId,
                name: vm.goal.name,
                description: vm.goal.description,
                estimation: vm.goal.estimation
            };

            GoalsService.addGoal(goalToSend, goalSucceded, goalFailed)
        }

        function goalSucceded(){
            $mdDialog.hide();
        }

        function goalFailed() {
            $mdToast.show(
                $mdToast.simple()
                    .content("Something goes wrong")
                    .position('bottom right')
                    .hideDelay(5000)
            );
        }
    }

})();
