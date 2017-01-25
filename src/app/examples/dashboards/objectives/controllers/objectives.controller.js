(function() {
    'use strict';

    angular
        .module('app.examples.dashboards')
        .controller('DashboardObjectivesController', ObjectivesController);

    //todo: declare and handle the success and failed operation much cleaner
    /* @ngInject */
    function ObjectivesController($rootScope, $mdToast, GoalsService, $scope, $mdDialog) {
        var vm = this;
        vm.objectives = [];
        vm.goalsResult = {
            goals: [],
            goalsCount: null
        };

        vm.query = {
            goals: 'date',
            limit: 8,
            page: 1
        };

        vm.openObjective = openObjective;
        vm.removeObjective = removeObjective;

        vm.getGoals = getGoals;
        vm.goalStatus = ['Open', 'Blocked', 'InProgress', 'ReadyToBeDone', 'Done', 'Closed',  'StandBy'];
        vm.goalSelected = null;

        vm.selectGoal = function(goal) {
            vm.goalSelected = goal;
        };

        //TODO: Add a function for creating objective
        $scope.$on('addObjective', function(ev){
            if(vm.goalSelected != null){
                $mdDialog.show({
                    templateUrl: 'app/examples/dashboards/objectives/views/add-objective-dialog.tmpl.html',
                    targetEvent: ev,
                    controller: 'ObjectiveDialogController',
                    controllerAs: 'vm',
                    locals: {
                        goalId: vm.goalSelected.Id
                    }
                })
                .then(function() {
                        GoalsService.getGoal(vm.goalSelected.Id, success, failure);

                        function success(result){
                            vm.goalSelected = result.data;
                        }

                        function failure(result){
                            $mdToast.simple()
                                .content(result.data.Message)
                                .position('bottom right')
                                .hideDelay(2000)
                        }
                });
            }
            else{
                $mdToast.show(
                    $mdToast.simple()
                        .content("Please select a goal first")
                        .position('bottom right')
                        .hideDelay(2000)
                );
            }
        });

        function openObjective(objective, $event)
        {
            $mdDialog.show({
                templateUrl: 'app/examples/dashboards/objectives/views/objective-view-dialog.tmpl.html',
                targetEvent: $event,
                controller: 'ObjectiveViewController',
                controllerAs: 'vm',
                locals: {
                    objective: angular.copy(objective)
                }
            })
            .then(function(){
                GoalsService.getGoal(vm.goalSelected.Id, success, failure);

                function success(result){
                    vm.goalSelected = result.data;
                }

                function failure(result){
                    $mdToast.simple()
                        .content(result.data.Message)
                        .position('bottom right')
                        .hideDelay(2000)
                }
            });
        }

        function removeObjective(objective, ev) {
            var confirm = $mdDialog.confirm()
                .title('Are you sure that you want to delete this objective?')
                .textContent('The objective will be not recovered.')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Delete')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function() {
                GoalsService.deleteObjective(objective, deleteObjectiveSuccess, handleFailed);
            }, function() {
                $scope.status = '';
            });
        }

        function deleteObjectiveSuccess(){
            $mdToast.show(
                $mdToast.simple()
                    .content('Updating list of objectives')
                    .position('bottom right')
                    .hideDelay(6000)
            );

            GoalsService.getGoal(vm.goalSelected.Id, updateSelectedGoal, failedToGetGoal);
        }

        function updateSelectedGoal(result){
            vm.goalSelected = result.data;

            for(var i = 0; i <= vm.goalsResult.goals.length; i++ ){
                if (vm.goalsResult.goals[i].Id == vm.goalSelected.Id){
                    vm.goalsResult.goals[i] = vm.goalSelected;
                }
            }
        }

        function failedToGetGoal(){
            $mdToast.show(
                $mdToast.simple()
                    .content('The goal selected is not received')
                    .position('bottom right')
                    .hideDelay(6000)
            );
        }

        function getGoals(){
            GoalsService.getGoals($rootScope.globals.currentUser.userProfileId, moment().startOf('year').toISOString(), moment().endOf('year').toISOString(), handleGoalSuccess, handleFailed)
        }

        function handleGoalSuccess(result){
            vm.goalsResult.goals = result.data.goals;
            vm.goalsResult.goalsCount = result.data.goalsCount;
        }

        function handleFailed(result){
            $mdToast.show(
                $mdToast.simple()
                    .content(result.data.Message)
                    .position('bottom right')
                    .hideDelay(7500)
            );
        }

        //init
        getGoals();
    }
})();
