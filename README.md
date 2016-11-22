# Dana & Chieh-Ping's Web To Do List

## Features
1. Load a Pre-Filled To Do List from Our Server with Suggestions of Important Items
2. Add a new To Do Item
3. Delete a Completed To Do Item
4. Refresh the page and retrieve your To Do List stored on the server whenever needed

##How to Run this Code
Clone or download and unzip the contents of this folder onto your computer. 

Before trying to run the code, you must download the following dependencies from NPM using the npm -install command.
express    
bodyParser
path

When all dependencies have been installed, navigate to the folder in terminal and type node server.js to start the server on localhost:8080.

Open a web browser of your choice and navigate to http://localhost:8080 to check out website on your computer. Or check your IP address (running the server) and have a friend check out the website by entering http://YOURIPADDRESSSERVERISON:8080

##Libraries, References & Styling
We found an example of typical To Do list functionality regarding simple HTML and some client-side javascript for adding the close tags at: [W3Schools To Do List](http://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_todo)

We consulted our teacher's API example for help with GET and POST requests on the server side:
[Student API Example Endpoints](https://github.com/web-advanced-fall-2016/students-api-endpoints)

We also consulted several Stack Exchange articles on how to splice items from a list in the correct way:
[Remove Item from Array by Value](http://stackoverflow.com/questions/3954438/remove-item-from-array-by-value)
[Remove Array Element Based on Object Property](http://stackoverflow.com/questions/15287865/remove-array-element-based-on-object-property)
[How to Delete an Iterm from an Array of Objects](http://stackoverflow.com/questions/5629914/how-to-delete-an-item-from-array-of-objects)

### Client-Server Interaction

We have created a server with different API endpoints for our requests (/api, /api1 and /close). We also set up "/apio" as a connection test.

Our To Do List retrieves an array of initial To Do List Items from the server at /api, each having a name and ID starting at 0. It then triggers a function on the client side to create a new list on the website using the data from this intial To Do List Array, and giving each list item the ID of the item from the server.

When adding a list item, a function is called upon hitting the "add" button via a "click" event listener. When clicked, this button triggers a POST request to the server at /api, triggering a function to push the data sent over (as an object) to the end of the Initial Data array. When successful, it responds back to the client and triggers an updateList function which receives the new Initial Data array back from the server and redraws it on the web page. This way, the data on the client website always reflects the state of the Initial Data array on the server.

We similarly added an event listener for clicks on the X button to the right of each list item. When clicked, the button triggers a function that retrieves the id of its parent List Item and Posts it back to the server. The server then calls a function to take the sent ID, compare it against the ID's in the initial data list, and remove the list item with that ID. When successful, the server responds back to the client and the update list function is run again, changing the client websites displayed list to reflect the new state of the server's Initial Data array.

The full website is hosted by the server through a command to publish everything in our "public folder" (CSS, HTML, client-side javascript etc.)

###Bugs & Things to Improve

Right now there is some dysfunctionality when items are added to quickly or removed to quickly and the server hangs in pending. We think this is a synchronicity issue triggered by some of the calls and are looking into how to solve it.

We'd also like to explore incorporating MongoDB and Mongoose and are planning to follow the following example to see if we can get it to work at a later date (since both of us want to work with servers for other classes): 

[To Do App with Express.Js/Node.js & MongoDB](https://webapplog.com/todo-app-with-express-jsnode-js-and-mongodb/)
