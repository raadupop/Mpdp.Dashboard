(function() {
    'use strict';

    angular
        .module('app.examples.dashboards')
        .controller('GoalDialogController', GoalDialogController);

    /* @ngInject */
    function GoalDialogController($window, $mdDialog, goal, GoalsService, $mdToast, ApiWebService, ApiConfig, EstimatesServices) {
        var vm = this;
        vm.cancelClick = cancelClick;
        vm.okClick = okClick;
        vm.goal = goal;
        vm.extraEstimates = null;
        vm.printClick = printClick;
        vm.updateClick = updateClick;
        vm.addExtraTimeEstimates = addExtraTimeEstimates;

        ////////////////

        function okClick() {
            $mdDialog.hide();
        }

        function cancelClick() {
            $mdDialog.cancel();
        }

        function printClick() {
            $window.print();
        }

        function updateClick() {
            GoalsService.updateGoal(vm.goal, success, failed);

            function success(result) {
                vm.goal = result.data;
                $mdToast.show(
                    $mdToast.simple()
                        .content('Goal was successfully updated')
                        .position('bottom right')
                        .hideDelay(5000)
                );
            }

            function failed(result) {
                $mdToast.show(
                    $mdToast.simple()
                        .content(result.data.Message)
                        .position('bottom right')
                        .hideDelay(5000)
                );
            }
        }

        function addExtraTimeEstimates(){
            var  data = {
                    goalId: goal.Id,
                    time: EstimatesServices.estimationTimeSpanWrapper(vm.extraEstimates)
            };

            ApiWebService.put(
                ApiConfig + 'goal/addextratime?goalId=' + goal.Id + '&time=' + EstimatesServices.estimationTimeSpanWrapper(vm.extraEstimates).toISOString(),
                data, success, failed);

            function success(){
                $mdDialog.hide();
            }

            function failed(result){
                $mdToast.show(
                    $mdDialog.simple()
                        .content(result.data.message)
                        .position('bottom right')
                        .hideDelay(3000)
                );
            }
        }
    }
})();
