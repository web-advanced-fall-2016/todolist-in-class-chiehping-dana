# Dana & Chieh-Ping's Web To Do List

## Features
1. Load a Pre-Filled To Do List from our Database with Suggestions of Important Items
2. Add a new To Do Item to the Database
3. Delete a Completed To Do Item from the Database
4. The database is saved locally as a JSON file ensuring your data is saved even if you refresh or close the page, or your server should fail
5. Return to your To Do List and see your saved items whenever needed

##API Endpoints 
| Verb	        | URL           | Description  | Response Structure
| ------------- |:-------------:| :-----:|:-----------:|
| USE  		    | /test		    | Sends a test message to the client | Object |
| GET	        | /initial      |   Gets the intial list of To Do Items, each has a name and ID | Structure with Initial To Do List Array |
| POST 		    | /addItem      |    Adds an Item with name and ID to the To Do List | Structure with Updated To Do List Array |
| POST 		    | /closeItem    |    Deletes an Item with the ID sent from the client from the To Do List | Structure with Updated To Do List Array |


##How to Run this Code
Clone or download and unzip the contents of this folder onto your computer. 

Before trying to run the code, you must download the following dependencies from NPM using the `npm -install` command.

+ express    
+ bodyParser
+ path
+ fs

When all dependencies have been installed, navigate to the folder in terminal and type `node server.js`
to start the server on `localhost:8080`.

Open a web browser of your choice and navigate to 
`http://localhost:8080`
to check out website on your computer. Or check your IP address (running the server) and have a friend check out the website by entering `http://YOURIPADDRESSSERVERISON:8080`

##Libraries, References & Styling
We found an example of typical To Do list functionality regarding simple HTML, CSS styling and some client-side javascript for adding the close tags at: [W3Schools To Do List](http://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_todo)

We consulted our teacher's API example for help with GET and POST requests on the server side:
[Student API Example Endpoints](https://github.com/web-advanced-fall-2016/students-api-endpoints)

We also consulted several Stack Exchange articles on how to splice items from a list in the correct way and write to a JSON file.

+ [Remove Item from Array by Value](http://stackoverflow.com/questions/3954438/remove-item-from-array-by-value)

+ [Remove Array Element Based on Object Property](http://stackoverflow.com/questions/15287865/remove-array-element-based-on-object-property)

+ [How to Delete an Iterm from an Array of Objects](http://stackoverflow.com/questions/5629914/how-to-delete-an-item-from-array-of-objects)

+ [How can I pretty-print JSON using Node.js](http://stackoverflow.com/questions/5670752/how-can-i-pretty-print-json-using-node-js)

## Client-Server Interaction

We have created a server with different API endpoints for our requests `(/intial`, `/addItem` and `/closeItem`). We also set up `/test` route as a connection test.

###Retrieve Initial To Do List Items
Our ToDo List immediately retrieves an array of initial To Do List Items from a JSON database using `/initial`, each having a name and ID starting at 0. It then triggers a function on the client side to create a new list on the website using the data from this intial database, and giving each list item the passed ID of the To Do List item on the server.

###Add an Item to the To Do List
When adding a list item, a client-side function is called upon hitting the "add" button via a "click" event listener. When clicked, this button triggers a POST request to the server at `/addItem`, sending an object with the information from the input box and an ID one greater than the last item in the list.
`{name: USER_INPUT, id: ID_OF_LAST_ITEM + 1}`

When successful, the server saves the new item to the JSON databse and then responds back with the updated array of To Do List Items from the databse. The server then passes the updated array to the client-side `updateList()` function which updates the client-side list of To Do Items. This ensures that the data on the client website always reflects the state of the To Do List database on the server, even if the page should close or server should quit after adding the item.

###Delete an Item from the To Do List
We similarly added an event listener for clicks on the X button to the right of each list item. When clicked, the button triggers a function that retrieves the id of its parent List Item and POSTS the ID to the `/closeItem` API on the server. The server takes this ID and calls a server-side function to remove the list item with that ID from the JSON database. The server then responds to the client with an updated array from the database which is again passed into the client-side `updateList()` function, updating the list on the website to reflect the change to the database, even if the page shoudl close or the server should quit after deleting the item.

###Website Hosting
The full website is hosted by the server over a website wide API located at '/' where it does a USE command to publish everything in our "public folder" (CSS, HTML, client-side javascript etc.)

##Bugs & Things to Improve
We solved our biggest bug with the `deleteItem()` function not removing the correct item.

Now our bug is that when all items are deleted from the To Do List, adding a new item won't work.

We'd also like to explore incorporating MongoDB and Mongoose and are planning to follow the following example to see if we can get it to work at a later date (since both of us want to work with servers for other classes): 

[To Do App with Express.Js/Node.js & MongoDB](https://webapplog.com/todo-app-with-express-jsnode-js-and-mongodb/)
