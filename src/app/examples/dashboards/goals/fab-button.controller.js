(function() {
    'use strict';

    angular
        .module('app.examples.dashboards')
        .controller('GoalsFabController', GoalsFabController  );

    /* @ngInject */
    function GoalsFabController($rootScope) {
        var vm = this;
        vm.changeDate = changeDate;
        vm.registerGoal = registerGoal;

        ////////////////

        function changeDate($event) {
            $rootScope.$broadcast('goalsChangeDate', $event);
        }

        function registerGoal($event) {
            $rootScope.$broadcast('registerGoal', $event)
        }
    }
})();
