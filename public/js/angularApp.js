/**
 * Created by William Headrick on 1/17/2016.
 * An angularjs front end for a prescription reminder developed on the MEAN STACK
 */

var app = angular.module('rx-remind', [
    'ui.router'
    //all dependents go here
]);

//STATE HANDLER
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('rxRemind', {
                url: '/rxReminder',
                views: {
                    '': {templateUrl: '/templates/newAlarmPage.html'},
                    'header@rxRemind':{templateUrl: '/templates/universal/header.html'},
                    'newAlarmForm@rxRemind':{templateUrl: '/templates/newAlarmForm.html'}
                },
                controller: 'NewScheduleCtrl'
            })

            .state('home', {
            url: '/home',
            views: {
                '': {templateUrl: '/templates/home/homePage.html'},
                'header@home':{templateUrl: '/templates/universal/header.html'},
                'topPanel@home':{templateUrl: '/templates/home/topPanel.html'},
                'about@home':{templateUrl: '/templates/home/about.html'},
                'solutions@home':{templateUrl: '/templates/home/solutions.html'},
                'blog@home':{templateUrl: '/templates/home/blog.html'}
            },
            controller: ''
        });
        //end of to be changed
        $urlRouterProvider.otherwise('home');
    }]);

//PROVIDERS (FACTORY, SERVICE, etc.)
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


app.controller('NewScheduleCtrl', [
    '$scope',
    '$http',
    '$location',
    function($scope, $http){

        //initialize checkboxes to false
        $scope.sunday = false;
        $scope.monday= false;
        $scope.tuesday = false;
        $scope.wednesday = false;
        $scope.thursday = false;
        $scope.friday = false;
        $scope.saturday = false;

        $scope.newAlarm = function(){
            //check that a day is checked
            if($scope.sunday == false && $scope.monday == false && $scope.tuesday == false && $scope.wednesday == false && $scope.thursday == false && $scope.friday == false && $scope.saturday == false){
                //TO-DO: SET ERROR MESSAGE TO SELECT DAY
                console.log('no days have been seleted');
                return;
            }

            var data = JSON.stringify({
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                phone: $scope.phone,
                email: $scope.email,
                sunday: $scope.sunday,
                monday: $scope.monday,
                tuesday: $scope.tuesday,
                wednesday: $scope.wednesday,
                thursday: $scope.thursday,
                friday: $scope.friday,
                saturday: $scope.saturday,
                duration: $scope.duration,
                time: $scope.time,
                prescription: $scope.prescription
            });
            console.log("about to send post");
            $http.post('/api/rx-reminder', data)
                .success(function(data,status,headers,config){
                    console.log("Post was success");
                    console.log(data);
                }).error(function(data,status,headers,config){
                console.log("Post was error");
                console.log(data);
            });
        };
    }]);