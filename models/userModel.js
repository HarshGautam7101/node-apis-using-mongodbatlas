/** Create Model User Data **/

'use strict';

/** Import mongoose **/

const mongoose = require("mongoose");

/** Declare schema and assign Schema class **/
    
const Schema = mongoose.Schema;

/** Create Schema Instance and add schema propertise **/

const UserSchema = new Schema({
	email: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
	},
	password: {
		type: Object,
		trim: true,
		lowercase: true
	},
	firstname: {
		type: String,
		trim: true,
		lowercase: true
	},
	lastname: {
		type: String,
		trim: true,
		lowercase: true
	},
	verification_code: {
		type: String
	},
	weight:{
        type:String,
		trim: true,
		lowercase: true
	},
	height:{
		type:String,
		trim: true,
		lowercase: true
	},
	exp_in_training:{
      type:String,
	  trim: true,
		lowercase: true
	},
	day:  {	type:Number
		  },
	month:{	type:Number
		      },
	year: {	type:Number
		      },
	createdOn: {
		type:Date,
		default:Date.now
	},

});

/** create and export model **/
module.exports = mongoose.model("users", UserSchema);