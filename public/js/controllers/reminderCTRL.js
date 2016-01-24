//CONTROLLERS
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

angular.module('ReminderController', [])

    .controller('NewScheduleCtrl',  function($scope, $http){
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
            console.log("Called new alarm in reminder CTRL");

            if($scope.sunday == false && $scope.monday == false && $scope.tuesday == false && $scope.wednesday == false && $scope.thursday == false && $scope.friday == false && $scope.saturday == false){
                //TO-DO: SET ERROR MESSAGE TO SELECT DAY
                console.log('no days have been seleted');
                return;
            }
            //Determine what times(UTC) for reminders
            var currentDate = new Date();
            var dateArray = new Array();
            var oneDay =  1000 * 60 * 60 * 24;

            var time1 = ($scope.time.getHours() * 60 *60 *1000) + ($scope.time.getMinutes() * 60 * 1000) + ($scope.time.getSeconds() *1000) + $scope.time.getMilliseconds();
            var time2 = (currentDate.getHours() * 60 *60 *1000) + (currentDate.getMinutes() * 60 * 1000) + (currentDate.getSeconds() *1000) + currentDate.getMilliseconds();
            var timeDifference = time1 - time2;
            if(timeDifference >= 0){
                //The desired time for the alarm is later in the day so + difference to current time
                currentDate.setTime(currentDate.getTime() + timeDifference);
            } else{
                //set the time to the right time one day ahead
                currentDate.setTime(currentDate.getTime() + timeDifference + oneDay);
            }

            for(i = 0; i < $scope.duration; i++){
                switch(currentDate.getDay()){
                    case 0:
                        if($scope.sunday){
                            dateArray.push(new Date(currentDate));
                        }
                        break;
                    case 1:
                        if($scope.monday){
                            dateArray.push(new Date(currentDate));
                        }
                        break;
                    case 2:
                        if($scope.tuesday){
                            dateArray.push(new Date(currentDate));
                        }
                        break;
                    case 3:
                        if($scope.wednesday){
                            dateArray.push(new Date(currentDate));
                        }
                        break;
                    case 4:
                        if($scope.thursday){
                            dateArray.push(new Date(currentDate));
                        }
                        break;
                    case 5:
                        if($scope.friday){
                            dateArray.push(new Date(currentDate));
                        }
                        break;
                    case 6:
                        if($scope.saturday){
                            dateArray.push(new Date(currentDate));
                        }
                        break;
                }
                currentDate.setTime(currentDate.getTime()+oneDay);
            }
            console.log(dateArray.toString());
            //TO-DO: Send information to database
            /* var data = $.param({
             firstName: $scope.firstName,
             lastName: $scope.lastName,
             phone: $scope.phone,
             email: $scope.email,
             alarms: dateArray
             });
             var config = {headers: {
             'Content-type': 'application/x-www-form-urlencoded;charset=utf-8;'
             }};
             $http.post('/reminders', data, config)
             .success(function (data, status, headers, config){
             console.log("were successful");
             })
             .error(function(data, status, header, config){
             console.log("connection error");
             })*/
            $http({
                url: '/reminders',
                method: "POST",
                data: { 'message' : 'test message' }
            })
                .then(function(response) {
                        console.log("successfully sent post method");
                        console.log(response);
                    },
                    function(response) { // optional
                        //failed
                        console.log("post method failed");
                    });
        };
    });