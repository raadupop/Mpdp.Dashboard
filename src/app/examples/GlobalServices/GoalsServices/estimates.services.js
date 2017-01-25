/**
 * Created by Radu  Pop on 7/31/2016.
 */
(function (){
    'use strict';

    angular
        .module('app')
        .factory('EstimatesServices', estimatesServices);

    /* @ngInject */
    function estimatesServices(moment){
        var dataFactory = {};

        dataFactory.estimationTimeSpanWrapper = estimationTimeSpanWrapper;

        return dataFactory;

        function estimationTimeSpanWrapper(duration){

            var mrx = new RegExp(/([0-9][0-9]?)[ ]?m/);
            var hrx = new RegExp(/([0-9][0-9]?)[ ]?h/);
            var drx = new RegExp(/([0-9][0-9]?)[ ]?d/);

            var days = 0;
            var hours = 0;
            var minutes = 0;

            if (mrx.test(duration)) {
                minutes = mrx.exec(duration)[1];
            }
            if (hrx.test(duration)) {
                hours = hrx.exec(duration)[1];
            }
            if (drx.test(duration)) {
                days = drx.exec(duration)[1];
            }

            duration = moment.duration(days + '.'  + hours + ':' + '' + minutes);

            return duration;
        }
    }

})();
