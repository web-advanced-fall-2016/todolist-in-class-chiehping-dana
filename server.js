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
        "name": "Mow the Lawn",
        "id":0
    },
    {
        "name": "Get a life",
        "id":1 
    },
    {
        "name": "Clean the Floor",
        "id":2
    },
    {
        "name": "Buy Some Thai Food",
        "id":3
    }

];

var port = process.env.PORT || 8080;        // set our port


//////////// middleware to use for all requests

app.use(function(req, res, next) {
    // Do Logging on every request
    console.log('Something is happening.');
    next(); // Go on to the next item
});

//Api for Connection test, prints success on the Client
app.use('/test' , function(req,res){
  res.json({message:"success"});
} );

//Api to get the Initial Items from the Server
app.get('/initial' , function(req,res){
	res.json(initialData);
});

//API for Adding an Item, Takes in an object with 
//name/id from client and returns an updated initial Data array
app.post('/addItem', function(req, res){
   console.log(req.body);
   initialData.push(req.body);
   console.log(initialData);
   res.json(initialData);
});

//API for Closing an Item, takes an object with ID# and returns an updated
//Initial Array to send to client
app.post('/closeItem', function(req, res){
   console.log(req.body);
   console.log(req.body.id);
   removeItem(req.body.id);
   console.log("removing " + req.body.id);
   console.log(initialData);
   res.json(initialData);
});


//function to remove an item from the array. Takes in an ID from /CloseItem
//API Post Method
function removeItem(id) {
 
/////Trying with a loop through the data and a splice function
//METHOD 1 ----------
// let tempArray = [];
// for (item of initialData) {
//   console.log("the item id's are" + item.id);
//   console.log("the incoming id is " + id);
//   if (item.id == id) {
//     console.log("the item is: " + item.id + " " +item.name);
//     tempArray = initialData.splice(item, 1); 
//     console.log('New Array is' + tempArray);
//     reIndex(id, tempArray);
//     initialData = tempArray;
//   }
// }
//--------------

//METHOD 2 ----------------
//Working the best, but issue is that clicking the top close
//Button is only way to close added items. Something wrong
//With the index.
for(var i=0; i<initialData.length; i++){
        if(initialData[i].id == id){
            initialData.splice(initialData[i].id, 1);
              //removes 1 element at position id 
           reIndex(id, initialData); //trying to reindex the array after every delete.
            break;
        }
    }
console.log(initialData);


//ReIndex Array Function (for Method 1 & 2) (to be called on each deleteItem) ---
function reIndex(id, array) {
  var result = [];
  console.log("mew");
  for (id in array) {
    result.push(array[id]);
    console.log("the result is " + result);
  }
  return result;
  initialData = result;
}
//-----------------------------------------------

//Trying with Reg Exp for the ID -- Not Working
  // if(!id) {
  //   return initialData;
  // }

  // let expression = new RegExp(id, 'i');
  // for (item of initialData) {
  //   if (expression.test(item.id)) {
  //       initialData.splice(item,1);
  //   }
  // }
  // return initialData;
  // console.log(initialData);
}

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);





