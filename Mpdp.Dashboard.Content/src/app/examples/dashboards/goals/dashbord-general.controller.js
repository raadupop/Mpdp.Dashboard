/**
 * Created by Radu  Pop on 5/29/2016.
 */
(function(){
    'use strict';

    angular
        .module('app.examples.dashboards')
        .controller('DashboardGeneralController', DashboardGeneralController);

    /* @ngInject */
    function DashboardGeneralController($scope, $rootScope, $mdToast, $mdDialog, GoalsService){
        var vm = this;

        vm.dateRange = {
            start: moment().startOf('year'),
            end: moment().endOf('year')
        };

        vm.query = {
            goals: 'date',
            limit: 5,
            page: 1
        };

        vm.goalsResult = {
            goals: [],
            totalGoals: 0
        };

        vm.finishedGoals = 0;
        vm.openGoals = 0;
        vm.openGoal = openGoal;
        vm.removeGoal = removeGoal;
        vm.addExtraTimeEstimate = addExtraTimeEstimate;

        function openGoal(goal, $event) {
            $mdDialog.show({
                controller: 'GoalDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/examples/dashboards/goals/goal-dialog.tmpl.html',
                locals: {
                    goal: goal
                },
                targetEvent: $event
            }).then(function() {

                // update new data
                getGoals();

                $mdToast.show(
                    $mdToast.simple()
                        .content('Goals is updating...')
                        .position('bottom right')
                        .hideDelay(2000)
                );
            });
        }

        function getGoals() {
            GoalsService.getGoals($rootScope.globals.currentUser.userProfileId, vm.dateRange.start.toISOString(), vm.dateRange.end.toISOString(), handleSuccess, handleFailed);

            function handleSuccess(result) {
                var json = result.data.goals;

                vm.openGoals = 0;
                vm.finishedGoals = 0;

                for (var i = 0; i < json.length; i++) {
                    if (json[i].GoalStatus === 'Open') {
                        vm.openGoals++;
                    }
                    if (json[i].GoalStatus === 'Done') {
                        vm.finishedGoals++;
                    }
                }

                vm.goalsResult.goals = result.data.goals;
                vm.goalsResult.totalGoals = result.data.goalsCount;
            }

            function handleFailed() {
                $mdToast.show(
                    $mdToast.simple()
                        .content("Ops something gos wrong with api")
                )
            }
        }

        $scope.$on('goalsChangeDate', function(event, $event) {
            $mdDialog.show({
                controller: 'GoalsDateChangeDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/examples/dashboards/goals/date-change-dialog.tmpl.html',
                locals: {
                    range: vm.dateRange
                },
                targetEvent: $event
            })
            .then(function() {
                // update new data
                getGoals();

                $mdToast.show(
                    $mdToast.simple()
                        .content('Goals is updating...')
                        .position('bottom right')
                        .hideDelay(2000)
                );
            });
        });

        $scope.$on('registerGoal', function(event, $event) {
            $mdDialog.show({
                controller: 'GoalRegisterController',
                controllerAs: 'vm',
                templateUrl: 'app/examples/dashboards/goals/goal-register-dialog.tmpl.html',
                targetEvent: $event
            })
                .then(function(){
                    // update new data
                    getGoals();

                    $mdToast.show(
                        $mdToast.simple()
                            .content('Goals is updating...')
                            .position('bottom right')
                            .hideDelay(2000)
                    );
                })
        });

        function removeGoal(goal, $event) {
            $mdDialog.show({
                controller: 'RemoveGoalController',
                controllerAs: 'vm',
                templateUrl: 'app/examples/dashboards/goals/goal-remove-dialog.tmpl.html',
                locals: {
                    goal: goal
                },
                targetEvent: $event
            }).then(function() {
                getGoals();

                $mdToast.show(
                    $mdToast.simple()
                        .content('The goal was successfully deleted')
                        .position('bottom right')
                        .hideDelay(3000)
                );
            });
        }

        function addExtraTimeEstimate(goal, $event) {
            $mdDialog.show({
                controller: 'GoalDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/examples/dashboards/goals/dialog-window/extra-estimates-time-dialog.tmpl.html',
                locals: {
                    goal: goal
                },
                targetEvent: $event
            }).then(function() {
                getGoals();

                $mdToast.show(
                    $mdToast.simple()
                        .content('Extra time estimate was added with success')
                        .position('bottom right')
                        .hideDelay(3000)
                );
            });
        }

        /// init
        getGoals();
    }
})();
