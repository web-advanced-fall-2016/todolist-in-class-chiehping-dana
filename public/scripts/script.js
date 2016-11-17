var baseURL = "http://localhost:8080";
console.log('here');
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

 test();
 test2();


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

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
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