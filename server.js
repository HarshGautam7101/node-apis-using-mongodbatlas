/** Main File to run the node **/

'use strict'

/** require express and bodyParser **/

const  express = require("express");
const  bodyParser = require("body-parser");
const cors = require('cors'); 



/** Include middleware for authentication **/

const VerifyToken = require("./middleware/authentication");
const config = require('./config/db');


/** Import DB Connection **/
require("./config/db");

/** Import API route **/
var routes = require('./routes/userRoutes'); 


/** create express app **/

const  app = express();
app.set('superSecret', config.secret);

/** define port to run express app **/
const  port = process.env.PORT || 3000;

/** use bodyParser middleware on express app **/

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(cors()); 


/** Add endpoint **/
app.get('/', (req, res) => {
	res.send("App is running");
});

/** Listen to server **/
app.listen(port, () => {
	console.log("Server running at http://localhost:$"+port);
});

routes(app);
