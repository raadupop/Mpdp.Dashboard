/**
 * Created by Radu  Pop on 6/22/2016.
 */
(function (){
    'use strict';

    angular
        .module('app.examples.dashboards')
        .controller('RemoveGoalController', RemoveGoalController);

    /* @ngInject */
    function RemoveGoalController($mdDialog, goal, ApiWebService, ApiConfig, $mdToast){

        var vm = this;
        vm.cancelClick = cancelClick;
        vm.goal = goal;
        vm.removeGoal = removeGoal;

        ////////////////

        function cancelClick() {
            $mdDialog.cancel();
        }

        function removeGoal(){
            var config = {
                params: {
                    id: goal.Id
                }
            };

            ApiWebService.deleteData(ApiConfig + 'goal/deletegoal', config, success, failure);

            function success(){
                $mdDialog.hide();
            }

            function failure(result){
                $mdToast.show(
                    $mdToast.simple()
                        .content(result.data.Message)
                        .position('bottom right')
                        .hideDelay(5000)
                );
            }
        }
    }

})();
