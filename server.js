// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var path = require('path');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

var initialData = [{
        "name": "item-1",
        "id": 0, 
        "description" : "apple"
    },
    {
        "name": "item-2",
        "id": 1, 
        "description": "banana"
    },
    {
        "name": "item-3",
        "id": 2,
        "description" : "orange"
    }
];



var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
//var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
app.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
// app.get('/', function(req, res) {
//     res.json(initialData);   
// });

app.use('/api' , function(req,res,next){
	res.json(initialData);
} );

app.use('/apio' , function(req,res,next){
	res.json({message:"success"});
} );
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);







