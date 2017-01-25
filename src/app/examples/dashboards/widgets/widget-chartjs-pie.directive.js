(function() {
    'use strict';

    angular
        .module('app.examples.dashboards')
        .directive('chartjsPieWidget', chartjsPieWidget);

    /* @ngInject */
    function chartjsPieWidget($timeout, ApiWebService, ApiConfig, $rootScope, $mdToast) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            require: 'triWidget',
            link: link,
            restrict: 'A'
        };
        return directive;

        function link($scope, $element, attrs, widgetCtrl) {
            widgetCtrl.setLoading(true);

            $timeout(function() {
                widgetCtrl.setLoading(false);
                getData();
            }, 1500);

            widgetCtrl.setMenu({
                icon: 'zmdi zmdi-more-vert',
                items: [{
                    icon: 'zmdi zmdi-refresh',
                    title: 'DASHBOARDS.WIDGETS.MENU.REFRESH',
                    click: function() {
                        widgetCtrl.setLoading(true);
                        $timeout(function() {
                            widgetCtrl.setLoading(false);
                        }, 1500);
                    }
                },{
                    icon: 'zmdi zmdi-share',
                    title: 'DASHBOARDS.WIDGETS.MENU.SHARE'
                },{
                    icon: 'zmdi zmdi-print',
                    title: 'DASHBOARDS.WIDGETS.MENU.PRINT'
                }]
            });

            $scope.pieChart = {
                labels: ['Open', 'In Progress', 'Blocked', 'Ready to be done', 'Done', 'Stand by', 'Closed'],
                data: []
            };

            function getData(){

                var config = {
                    params: {
                        userProfileId: $rootScope.globals.currentUser.userProfileId
                    }
                };

                ApiWebService.get(ApiConfig + 'analytics/getgoalsstatistics', config, success, failed);

                function success(result) {
                    $scope.pieChart.data = [];

                    $scope.pieChart.data.push(
                        result.data.OpenGoalsCount,
                        result.data.InProgressGoalsCount,
                        result.data.BlockedGoalsCount,
                        result.data.ReadyToBeDoneCount,
                        result.data.DoneGoalsCount,
                        result.data.StandByGoalsCount,
                        result.data.ClosedGoalsCount);
                }

                function failed(result) {
                    $mdToast.show(
                        $mdToast.simple()
                            .content(result.data)
                            .position('bottom right')
                            .hideDelay(1500)
                    );
                }


            }
        }
    }
})();
