(function() {
    'use strict';

    angular
        .module('app.examples.dashboards')
        .controller('ObjectiveFabController', ObjectiveFabController);

    /* @ngInject */
    function ObjectiveFabController($rootScope) {
        var vm = this;
        vm.addObjective = addObjective;

        ////////////////

        function addObjective($event) {
            $rootScope.$broadcast('addObjective', $event);
        }
    }
})();
