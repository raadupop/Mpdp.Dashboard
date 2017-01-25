/**
 * Created by Radu  Pop on 5/29/2016.
 */
(function(){
    'use strict';

    angular
        .module('app')
        .filter('duration', duration);

    /* @ngInject */
    function duration(moment){
        return DurationFilter;

        function DurationFilter(value){
            var duration = moment.duration(value);

            duration = duration.days() + 'd ' + duration.hours() +'h ' + duration.minutes() + 'm';

            return duration;
        }
    }
})();
