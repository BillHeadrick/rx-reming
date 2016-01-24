/**
 * Created by William on 1/22/2016.
 */
var mongoose = require('mongoose');

var ReminderSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phone: Number,
    email: String,
    medication: String,
    alarms: [Date]
});

module.exports = mongoose.model('Reminder', ReminderSchema);