/** import User Model **/

const User = require("../models/userModel");
const Diet = require("../models/dietModel");
const Goal =require("../models/goalsModel");
const Schema = require('../validations/userValidations'); 
var config_secret = require('../config/db');
var saltRounds = 10;
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync();
const jwt = require('jsonwebtoken');
var crypto = require("crypto");

/** DEFINE CONTROLLER FUNCTIONS **/

/** createNewUser function - To create new user **/

exports.createNewUser = async(req, res, err) => {
	try{
		/** Get all form data in one constant **/
		var newUser = new User(req.body);
		
		/** Create random id to confirm user ***/
		var verify_id = crypto.randomBytes(20).toString('hex');
		
		/** Check User validation before to save **/
		var validation = Schema.userPOST.validate(req.body);
		
		if(validation.error){
			var error = validation.error.details[0].message;
			res.status(200).json({ success: false, message:"Invalid Input",error}); 
		}
		else{
			/** Check Email exists or not after successfull validation **/
			var user = await User.exists({email:req.body.email});
			
			/** If Email exists return **/
			if(user)
				res.status(200).send({ success: false,message:"Email alreday exist"});
			else{
				/** If Email not exists save data **/
				
				/** Encrypt Password **/
				
				userpassword = req.body.password;
				hashpass = bcrypt.hashSync(userpassword, saltRounds);
				newUser.password = hashpass;
				
				/** Save Data **/
				
				newUser.save((err, user) => {
					if (err) {
						res.status(200).json({ success: false, message:"Something went wrong! User not created successfully!",err,user});
					}
					res.status(200).send({ success: true,message:"User Created Successfully",user});
				});
			}
		}
	}catch (err) {
	  return res.status(400).send({success:false,message:err.details[0].message});
	}
};

/** LoginUser function -- Login functionality **/

exports.userlogin = async(req, res, err) => {
	try{
		/** Get all form data in one constant **/
	
		var newUser = new User(req.body);
		
		/** Check User validation before to save **/
		var validation = Schema.userLogin.validate(req.body);
		
		if(validation.error){
			var error = validation.error.details[0].message;
			res.status(200).json({ success: false, message:"Invalid Input",error}); 
		}
		else{
			/** Check User after successfull validation **/
			var user = await User.exists({email:req.body.email});
			
			if(user){
				var query = { 'email': req.body.email};
				User.find(query,function(err, result) {
					if (err) res.status(200).send({ success: false,message:"Something went wrong please try again!"});
					
					/** Match Password **/
					userpassword = req.body.password;
					dbpassword = result[0].password;
					bcrypt.compare(userpassword, dbpassword, function (err, resul) {
						if(resul == true){
							
							/*** Generate Token while login process ***/
							const token_param = {email: result[0].email, id: result[0]._id };
							
							/* Create Token  */
							var token = jwt.sign(token_param, config_secret.secret, {expiresIn: "15d" });
							
							res.status(200).send({ success: true,message: 'Login Successfully.',token:token });
						}
						else{
							/** Password not matched return **/
							res.status(200).send({ success: true,message: 'Password not matched! Please enter correct password'});
						}
					})
				})
			}
			else{
				res.status(200).send({ success: false,message:"Email not matched! Please enter correct email"});
			}
		}
	}catch (err) {
		 return res.status(400).send({success:false,message:err.details[0].message});
	}
};

/** listAllusers function - To list all todos **/

exports.listAllUsers = (req, res) => {
	User.find({}, (err, user) => {
		if (err) {
			res.status(500).send(err);
		}
			res.status(200).json(user);
	});
};
/** listAllusers function - To list all 200caloriesmeal **/

exports.listAlldiet = async(req, res) => {
	var diet = await Diet.find({calorie_category:req.params.calorie_category});
	console.log(diet.length);
	
    if(diet.length>0)
	res.status(200).json({success:true,message:"Data Fetch successfully",data:diet});
	else
	 res.status(200).send({success:false,message:"No such diet found"});
};

/** updateuser function - To update user status by id **/

exports.updateUser = async (req, res) => {
	
	/** Before update check user exist or not **/
	var user = await User.exists({_id:req.params.id});
	
	/*** If exist find and update the user ***/
	if(user){
		User.findOneAndUpdate({ _id:req.params.id }, req.body, { new:true }, (err, user) => {
			if (err) {
				res.status(200).json({ message:"Something went wrong!", err});
			}
				res.status(200).json({ message:"User updated successfully!",user});
		});
	}
	else{
		/*** If not exist send error message ***/
		res.status(200).json({ message:"User not exist! Invalid UserId"});
	}
};

/** deleteuser function - To delete user by id **/

exports.deleteUser = async ( req, res) => {
	
	/** Before delete check user exist or not **/
	var user = await User.exists({_id:req.params.id});
	
	/*** If exist delete the user ***/
	if(user){
		User.deleteOne({ _id:req.params.id }, (err) => {
			if (err) {
				res.status(200).json({ message:"Something went wrong!", err});
			}
			res.status(200).json({ message:"User successfully deleted"});
		});
	}
	else{
		/*** If not exist send error message ***/
		res.status(200).json({ message:"User not exist! Invalid UserId"});
	}

};
	/**to add user's goal related information */
	exports.usergoals =async (req, res, err) => {
		const goalinfo = new Goal(req.body);
    try {
		  await goalinfo.save();
		  res.send(goalinfo);
		} catch (error) {
			res.status(200).send({success:false,message:"unable to fetch all information"});
		}
	};