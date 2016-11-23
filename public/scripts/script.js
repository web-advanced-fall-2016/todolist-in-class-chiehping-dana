var baseURL = "http://localhost:8080";
console.log('here');
var initialItems = [];
var updatedList = [];
var listOne = document.getElementById("one");
var newItem;

//Steps to Accomplish This
//1 = Get The Initial Items Array to Show Up as List Items on Client -- DONE
//2 = Create Add Item Function that adds a new item to array in the
//server with name = whatever in input box, id = next id in series (1, 2, 3) -- DONE
//3 = Create a Remove Item Function that finds an item by its id in the
//server array and remove it -- DONE BUT BUGGY
//4 - Make sure there is function that refreshes the list in the client
//so that always showing the up to date array in server -- DONE


//Why isn't this working with our code??? 
// (function() {

//     if (document.readyState != "loading") {
//      testConnection();
//     getInitialItems();
//     } else {
//         document.addEventListener('DOMContentLoaded', function() {
//         testConnection();
//     getInitialItems();
//         }, false);
//     }


window.onload = function() {
    // addEventListener();
    getInitialItems();
    testConnection();
};


function getInitialItems() {
    $.ajax({
        method:"GET",
        url: baseURL + `/initial`
    }).done(function(res){
        console.log('Got the initial items.');
        console.log(res);
            for (i = 0; i < res.length; i++) {
                console.log(res[i]);
                initialItems.push(res[i]);
            }
            createList();
            createCloseButton();    
    })

};

//AJAX GET & POST REQUESTS TO TALK TO SERVER

//Test the Connection
function testConnection() {

 $.ajax({
        method:"GET",
        url: baseURL + `/test`
    }).done(function(res){
        console.log("Test result is " + res.message);

})
}

//Add an Item, Called on Clicking Add Button, Takes Input Value & ID object
function addItem(data) {

 $.ajax({
        method:"POST",
        url: baseURL + `/addItem`,
        data: data
    }).done(function(res){
        console.log(data + " was sent to server");
        console.log("The result is " + res);
        refreshList(res);
});
}

//Delete an Item from the Server
function deleteFromServer(id) {
 $.ajax({
        method:"POST",
        url: baseURL + `/closeItem`,
        data: {"id":id}
    }).done(function(res){
        console.log(id + " was sent to server");
        refreshList(res);
        
});
}

//FUNCTIONS TO HANDLE INCOMING & OUTGOING DATA ON CLIENT SIDE

//Create the List Upon Load or Reload
function createList() {
    console.log("creatinglist...");
    var list = document.querySelector('ul');
    // var li = document.createElement('li');
    for (item of initialItems) {
        list.innerHTML += "<li id=' " + item.id + "'>" + item.name + "</li>";
    }
}

//Refresh the list. Called after each Add Item or Delete Item Request
//To Stay in sync with the Server Database
function refreshList(data) {
  updatedList = data;
  console.log(updatedList);
  console.log("new list refresh");
  var list = document.querySelector('ul');
  list.innerHTML = "";
    for (item of updatedList) {
        list.innerHTML += "<li id=' " + item.id + "'>" + item.name + "</li>";
    } 
      createCloseButton();
}

// Prepare Information to Send to the Add Item AJAX Post.
//If they didn't write anything, make an alert.
//Run from a Event Listener on the Add Button in the Index
function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var nextID = parseInt(document.getElementById("myUL").lastChild.id) + 1;
    console.log(nextID);

    if (inputValue === '') {
        alert("You must write something!");
    } else {
          newItem = { name: inputValue, id: nextID };
          addItem(newItem);
          var inputValue = '';
          console.log(nextID);
              }
}

// Create a "close" button and append it to each list item
function createCloseButton() {
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
    span.addEventListener('click', function(ev) {
      if (ev.target.parentElement.nodeName === 'LI') {
        console.log(ev.target.parentElement.id);
        let currentItem = ev.target.parentElement.id;
        closeItem(currentItem);
      }
    })
}
}

//Run the Delete Function from Server Post Request with ID sent in
function closeItem(id){
  console.log("the id of the thing to close is" + id);
  deleteFromServer(id);

}

