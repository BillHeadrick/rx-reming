/**
 * Created by William on 1/22/2016.
 */
angular.module('ReminderService', [])

    // super simple service
    // each function returns a promise object
    .factory('Reminder', function($http) {
        return {
            create : function(reminderData) {
                return $http.post('/api/rx-reminder', reminderData);
            }
        }
    });