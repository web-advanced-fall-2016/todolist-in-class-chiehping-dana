var baseURL = "http://localhost:8080";
console.log('here');
var initialItems = [];
var listOne = document.getElementById("one");

window.onload = function() {
test();
 test2();
 
};



function test() {
    let config = {
        method: 'GET',
        headers: new Headers({}),
    };

    let request = new Request(`${baseURL}/api`, config);
    fetch(request)
        .then(function(res) {

            if (res.status == 200)
                return res.json();
            else
                throw new Error('Something went wrong on api server!');
        })
        .then(function(res) {
            // populatestudentID(res);
            console.log(res);

            for (i=0;i<res.length;i++) {
              console.log(res[i]);
              initialItems.push(res[i]);
            }
            console.log("Initial Items are: " + initialItems[0].description);
            createList();
        })

    .catch(function(err) {
        console.warn(`Couldn't fetch info list`);
        console.log(err);
    });
}

function test2() {
    let config = {
        method: 'GET',
        headers: new Headers({}),
    };

    let request = new Request(`${baseURL}/apio`, config);
    fetch(request)
        .then(function(res) {

            if (res.status == 200)
                return res.json();
            else
                throw new Error('Something went wrong on api server!');
        })
        .then(function(res) {
            // populatestudentID(res);
            console.log(res);
        })

    .catch(function(err) {
        console.warn(`Couldn't fetch info list`);
        console.log(err);
    });
}
 // listOne.innerHTML = initialItems[0];



// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);


function createList() {
  console.log("creatinglist...");
  var list = document.querySelector('ul');
  // var li = document.createElement('li');




  for (item of initialItems) {
    list.innerHTML += "<li id=' " + item.id + "'>" + item.name + "</li>";
  }

  
}

//1 = Get The Initial Items Array to Show Up as List Items on Client
//2 = Create Add Item Function that adds a new item to array in the
//server with name = whatever in input box, id = next id in series (1, 2, 3)
//3 = Create a Remove Item Function that finds an item by its id in the
//server array and remove it
//4 - Make sure there is function that refreshes the list in the client
//so that always showing the up to date array in server







// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue;

  for (i=0;i<initialItems.length;i++) {
    inputValue = initialItems[1].name;
  }

  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}