/**
 * Created by William on 1/22/2016.
 */
var Reminder = require('./models/Reminders.js');

module.exports = function(app) {

    // api ---------------------------------------------------------------------

    // create todo and send back all todos after creation
    app.post('/api/rx-reminder', function(req, res) {
        console.log("Post recieved again");
        console.log(req.body);
        // create a todo, information comes from AJAX request from Angular
        //Determine what times(UTC) for reminders
        var timeDate = new Date(req.body.time);
        var currentDate = new Date();
        var dateArray = new Array();
        var oneDay =  1000 * 60 * 60 * 24;

        var time1 = (timeDate.getHours() * 60 *60 *1000) + (timeDate.getMinutes() * 60 * 1000) + (timeDate.getSeconds() *1000) + timeDate.getMilliseconds();
        var time2 = (currentDate.getHours() * 60 *60 *1000) + (currentDate.getMinutes() * 60 * 1000) + (currentDate.getSeconds() *1000) + currentDate.getMilliseconds();
        var timeDifference = time1 - time2;
        if(timeDifference >= 0){
            //The desired time for the alarm is later in the day so + difference to current time
            currentDate.setTime(currentDate.getTime() + timeDifference);
        } else{
            //set the time to the right time one day ahead
            currentDate.setTime(currentDate.getTime() + timeDifference + oneDay);
        }

        for(i = 0; i < req.body.duration; i++){
            switch(currentDate.getDay()){
                case 0:
                    if(req.body.sunday){
                        dateArray.push(new Date(currentDate));
                    }
                    break;
                case 1:
                    if(req.body.monday){
                        dateArray.push(new Date(currentDate));
                    }
                    break;
                case 2:
                    if(req.body.tuesday){
                        dateArray.push(new Date(currentDate));
                    }
                    break;
                case 3:
                    if(req.body.wednesday){
                        dateArray.push(new Date(currentDate));
                    }
                    break;
                case 4:
                    if(req.body.thursday){
                        dateArray.push(new Date(currentDate));
                    }
                    break;
                case 5:
                    if(req.body.friday){
                        dateArray.push(new Date(currentDate));
                    }
                    break;
                case 6:
                    if(req.body.saturday){
                        dateArray.push(new Date(currentDate));
                    }
                    break;
            }
            currentDate.setTime(currentDate.getTime()+oneDay);
        }
        console.log(dateArray.toString());
        Reminder.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            email: req.body.email,
            medication: req.body.prescription,
            alarms: dateArray
        }, function(err, reminders){
            if(err) {console.log("error")}
            else {console.log("success")}
        });

        res.send("Post recieved");
    });

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};