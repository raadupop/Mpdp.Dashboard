/**
 * Created by Radu  Pop on 5/29/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.examples.dashboards')
        .factory('GoalsService', GoalsService);

    /* @ngInject */
    function GoalsService(ApiWebService, ApiConfig){
        var service = {};

        service.addGoal = addGoal;
        service.getGoals = getGoals;
        service.updateGoal = updateGoal;
        service.updateObjective = updateObjective;
        service.addObjective = addObjective;
        service.saveWorkedLog = saveWorkedLog;
        service.deleteGoal = deleteGoal;
        service.deleteObjective = deleteObjective;
        service.getObjectives = getObjectives;
        service.getGoal = getGoal;

        return service;

        function getGoals(userId, startDate, endDate, success, failed){
            var config = {
                params: {
                    userId: userId,
                    startDate: startDate,
                    endDate: endDate
                }
            };

            ApiWebService.get(ApiConfig + 'goal/getgoals', config, success, failed);
        }

        function updateGoal(goal, success, failed){
            ApiWebService.put(ApiConfig + 'goal/update', goal, success, failed);
        }

        function updateObjective(objective, success, failed){
            ApiWebService.put(ApiConfig + 'goal/updateobjective', objective, success, failed);
        }

        function addGoal(goal, success, failed)
        {
            goal.estimation = estimationTimeSpanWrapper(goal.estimation);
            ApiWebService.post(ApiConfig + 'goal/creategoal', goal, success, failed);
        }

        function addObjective(objective, success, failed){
            objective.estimation = estimationTimeSpanWrapper(objective.estimation);
            ApiWebService.post(ApiConfig + 'goal/createobjective', objective, success, failed);
        }

        function saveWorkedLog(woorkedLog, success, failed){
            woorkedLog.Duration = estimationTimeSpanWrapper(woorkedLog.Duration);
            ApiWebService.post(ApiConfig + 'effortlogging/addworkedlog', woorkedLog, success, failed);
        }

        function deleteGoal(goal, success, failed){
            ApiWebService.deleteData(ApiConfig + 'goal/deletegoal?id=' + goal.Id, failed, success);
        }

        function deleteObjective(objective, success, failed){
            ApiWebService.deleteData(ApiConfig + 'goal/deleteobjective?id=' + objective.Id, failed, success)
        }

        function getObjectives(goalId, success, failed){
            var config = {
                params: {
                    goalId: goalId
                }
            };
            ApiWebService.get(ApiConfig + 'goal/getobjectives', config, success, failed)
        }

        function getGoal(goalId, success, failed){
            var config = {
                params: {
                    goalId: goalId
                }
            };
            ApiWebService.get(ApiConfig + 'goal/getgoal', config, success, failed)
        }

        //todo make own services for this
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
