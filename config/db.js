/** Create connection with mongodb database **/

module.exports = {
   'secret': 'appsecret',
};

/** Export Packages to run the app **/

const  mongoose = require("mongoose");

/** Assign MongoDB connection string to Uri and declare options settings **/

var  uri = "mongodb+srv://harsh1:hp2009fb@cluster0.joq6b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

/** Declare a variable named option and assign optional settings **/

const  options = {
	useNewUrlParser:  true,
	useUnifiedTopology:  true
};

/** Connect MongoDB Atlas using mongoose connect method **/

mongoose.connect(uri, options).then(() => {
	console.log("Database connection established!");
},
err  => {
	{
		console.log("Error connecting Database instance due to:", err);
	}
});