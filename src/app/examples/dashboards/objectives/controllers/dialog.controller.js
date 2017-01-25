(function() {
    'use strict';

    angular
        .module('app.examples.dashboards')
        .controller('ObjectiveDialogController', DialogController);

    /* @ngInject */
    function DialogController($mdDialog, $mdToast, goalId, GoalsService) {
        var vm = this;
        vm.cancel = cancel;
        vm.hide = hide;
        vm.createObjective = createObjective;
        vm.objective = {
            goalId: null,
            title: '',
            description: '',
            estimation: '',
            objectiveRank: ''
        };

        /////////////////////////

        function createObjective(){
            vm.objective.goalId = goalId;

            GoalsService.addObjective(vm.objective, handleObjectiveSuccess, handleFailed);

            function handleFailed(result){
                $mdToast.show(
                    $mdToast.simple()
                        .content(result.data.Message)
                        .position('bottom right')
                        .hideDelay(7500)
                );
            }

            function handleObjectiveSuccess(){
                hide();
            }
        }

        function hide() {
            $mdDialog.hide();
        }

        function cancel() {
            $mdDialog.cancel();
        }
    }
})();
