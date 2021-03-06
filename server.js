/**
 * Created by William on 1/22/2016.
 */
// server.js

// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration =================
//var database = require('./config/database');

mongoose.connect(process.env.MONGOLAB_URI, function(error){
    if(error){console.error(error)}
    else console.log('mongo connected');
});     // connect to mongoDB database

// LOCAL HOST
/*mongoose.connect('mongodb://william:howard@ds049935.mongolab.com:49935/rx-remind', function(error){
    if(error){console.error(error)}
    else console.log('mongo connected');
});*/

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// load the routes
require('./app/routes')(app);

// listen (start app with node server.js) ======================================
//set port
var port = Number(process.env.PORT || 8080);
app.listen(port);
console.log("App listening on port "+port);