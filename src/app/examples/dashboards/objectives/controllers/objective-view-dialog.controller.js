(function() {
    'use strict';

    angular
        .module('app.examples.dashboards')
        .controller('ObjectiveViewController', GoalDialogController);

    /* @ngInject */
    function GoalDialogController($window, $mdDialog, objective, GoalsService, $mdToast) {
        var vm = this;
        vm.cancelClick = cancelClick;
        vm.okClick = okClick;
        vm.objectiveDialog = objective;
        vm.workedLog = {
            objectiveId: objective.Id
        };
        vm.printClick = printClick;
        vm.updateClick = updateClick;
        vm.addTimeWorking = addTimeWorking;

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

        function addTimeWorking(){
            if (vm.workedLog.DateRecorded != null){
                vm.workedLog.DateLog = moment(vm.workedLog.DateRecorded).toISOString();
            }
            GoalsService.saveWorkedLog(vm.workedLog, handleSuccess, handleFailed)
        }

        function updateClick(){
            GoalsService.updateObjective(vm.objectiveDialog, handleSuccess, handleFailed);
        }

        function handleSuccess(result){
            $mdToast.show(
                $mdToast.simple()
                    .content(result.data)
                    .position('bottom right')
                    .hideDelay(5000)
            );
            $mdDialog.hide();
        }

        function handleFailed(result){
            $mdToast.show(
                $mdToast.simple()
                    .content(result.data.Message)
                    .position('bottom right')
                    .hideDelay(5000)
            );
        }

    }
})();
