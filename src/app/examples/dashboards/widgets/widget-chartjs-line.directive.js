(function() {
    'use strict';

    angular
        .module('app.examples.dashboards')
        .directive('chartjsLineWidget', chartjsLineWidget);

    /* @ngInject */
    function chartjsLineWidget($timeout, $interval, ApiWebService, ApiConfig, $rootScope, $mdToast) {

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
                        $interval.cancel($scope.intervalPromise);
                        widgetCtrl.setLoading(true);
                        $timeout(function() {
                            widgetCtrl.setLoading(false);
                            randomData();
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

            $scope.lineChart = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                series: ['Efficiency', 'Total worked time'],
                options: {
                    datasetFill: false,
                    responsive: true
                },
                data: []
            };

            function getData() {

                var config = {
                    params: {
                        userProfileId: $rootScope.globals.currentUser.userProfileId
                    }
                };

                ApiWebService.get(ApiConfig + 'analytics/getgoalsperformance', config, success, failed);

                function success(result) {
                    $scope.lineChart.data = [];
                    var rowE = [];
                    var rowW = [];

                    for(var i = 0; i < result.data.length; i++){
                        rowE.push(result.data[i].Efficiency);
                        rowW.push(result.data[i].WorkedHours);
                    }

                    $scope.lineChart.data.push(rowE);
                    $scope.lineChart.data.push(rowW);

                    // Moked data
                    //
                    //$scope.lineChart.data = [];
                    //for(var series = 0; series < $scope.lineChart.series.length; series++) {
                    //    var row = [];
                    //    for(var label = 0; label < $scope.lineChart.labels.length; label++) {
                    //        row.push(Math.floor((Math.random() * 350) + 1));
                    //    }
                    //    $scope.lineChart.data.push(row);
                    //}
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

            // Simulate async data update
            //$scope.intervalPromise = $interval(randomData, 5000);
        }
    }
})();
