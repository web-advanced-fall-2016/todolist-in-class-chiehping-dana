var baseURL = "http://localhost:8080";
console.log('here');
var initialItems = [];
var updatedList = [];
var listOne = document.getElementById("one");
var newItem;

window.onload = function() {
    // addEventListener();
    getInitialItems();
    testConnection();
};





function getInitialItems() {
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

            for (i = 0; i < res.length; i++) {
                console.log(res[i]);
                initialItems.push(res[i]);
            }
            createList();
            createCloseButton();
        })

    .catch(function(err) {
        console.warn(`Couldn't fetch info list`);
        console.log(err);
    });
}

function testConnection() {
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

function addItem(data) {
  $.ajax({
    type: "POST",
    url: baseURL + '/api1',
    data: data,
    success: console.log(data + "was sent to server")
  });

  let config = {
        method: 'GET',
        headers: new Headers({}),
    };
  let request = new Request(`${baseURL}/api1`, config);
  fetch(request)
        .then(function(res) {
            if (res.status == 200)
                return res.json();
            else
                throw new Error('Something went wrong on api server!');
        })
        .then(function(res) {
            console.log("The result is" + res);
            refreshList(res);
        })

    .catch(function(err) {
        console.warn(`Couldn't fetch info list`);
        console.log(err);
    });

}

function deleteFromServer(id) {
  $.ajax({
    type: "POST",
    url: baseURL + '/close',
    data: {"id": id},
    success: console.log(id + " was sent to server"),
  });

let config = {
        method: 'GET',
        headers: new Headers({}),
    };

    let request = new Request(`${baseURL}/close`, config);
    fetch(request)
        .then(function(res) {

            if (res.status == 200)
                return res.json();
            else
                throw new Error('Something went wrong on api server!');
        })
        .then(function(res) {
            // populatestudentID(res);
          refreshList(res);
        })

    .catch(function(err) {
        console.warn(`Couldn't fetch info list`);
        console.log(err);
    });


}


function createList() {
    console.log("creatinglist...");
    var list = document.querySelector('ul');
    // var li = document.createElement('li');

    for (item of initialItems) {
        list.innerHTML += "<li id=' " + item.id + "'>" + item.name + "</li>";
    }

  let config = {
        method: 'GET',
        headers: new Headers({}),
    };
  let request = new Request(`${baseURL}/api1`, config);
  fetch(request)
        .then(function(res) {
            if (res.status == 200)
                return res.json();
            else
                throw new Error('Something went wrong on api server!');
        })
        .then(function(res) {
            console.log("The result is" + res);
            refreshList(res);
        })

    .catch(function(err) {
        console.warn(`Couldn't fetch info list`);
        console.log(err);
    });

}

//1 = Get The Initial Items Array to Show Up as List Items on Client
//2 = Create Add Item Function that adds a new item to array in the
//server with name = whatever in input box, id = next id in series (1, 2, 3)
//3 = Create a Remove Item Function that finds an item by its id in the
//server array and remove it
//4 - Make sure there is function that refreshes the list in the client
//so that always showing the up to date array in server

function refreshList(data) {
  updatedList = data;
  console.log("new list refresh");
  var list = document.querySelector('ul');
  list.innerHTML = "";
    for (item of updatedList) {
        list.innerHTML += "<li id=' " + item.id + "'>" + item.name + "</li>";
    } 
      // console.log("refreshing list...");
      // console.log(data);
      // var list = document.querySelector('ul');
      // var text = document.createTextNode(data.name);
      // var item = document.createElement("li");
      // item.append(text);
      // item.id = data.id;
      // list.appendChild(item);
      createCloseButton();
}

// Create a new list item when clicking on the "Add" button
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
          console.log(nextID);
        // document.getElementById("myUL").appendChild(li);
    }


    // var t = document.createTextNode(inputValue);
    // li.appendChild(t);
    // if (inputValue === '') {
    //     alert("You must write something!");
    // } else {
    //     document.getElementById("myUL").appendChild(li);
    // }
    // document.getElementById("myInput").value = "";

    // var span = document.createElement("SPAN");
    // var txt = document.createTextNode("\u00D7");
    // span.className = "close";
    // span.appendChild(txt);
    // li.appendChild(span);

    // for (i = 0; i < close.length; i++) {
    //     close[i].onclick = function() {
    //         var div = this.parentElement;
    //         div.style.display = "none";
    //     }
    // }
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

function closeItem(id){
  console.log("the id of the thing to close is" + id);
  deleteFromServer(id);

}


// function addEventListener() {
//         var input = document.querySelector('input');
//         input.addEventListener('input', handleInput, false);
//         searchResults.addEventListener('click', function(evnt) {
//             console.log(evnt.target.dataset.id);
//             populateRecord(evnt.target.dataset.id);
//         });

//     }


// function closeItem() {
// var thisElement = 

// var i;
// for (i = 0; i < close.length; i++) {
//     close[i].onclick = function() {
//         var div = this.parentElement;
//         div.style.display = "none";
//         console.log(div);
//     }
// }


// }

// Click on a close button to hide the current list item
//get the id of the thing clicked on
//send a post request that deletes it
//rerun the refresh list item





// // Add a "checked" symbol when clicking on a list item
// var list = document.querySelector('ul');
// list.addEventListener('click', function(ev) {
//     if (ev.target.tagName === 'LI') {
//         ev.target.classList.toggle('checked');
//     }
// }, false);
