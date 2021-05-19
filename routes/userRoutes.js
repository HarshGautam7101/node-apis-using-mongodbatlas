/* =================== Create Routes for Users Module  ============================*/

'use strict';



module.exports = function(app) {
/* =================== Call usercontroller function  ============================*/
	
	var userList = require('../controllers/userController'); 
	var VerifyToken = require('../middleware/authentication');
	
/* =================== Add User ============================*/

	app.route("/user/add").post(userList.createNewUser);
	
/* =================== Login Users ============================*/

	app.route("/user/login").post(userList.userlogin);
	

/* =================== Get All Users ============================*/

	app.route("/users").get(userList.listAllUsers);

/* =================== Get specific calorie meals============================*/
	
	app.route("/users/diet/:calorie_category").get(userList.listAlldiet);

/* =================== Add User's goals and info============================*/

   app.route("/user/usergoals/add").post(VerifyToken,userList.usergoals);
   	
/* =================== Update User ============================*/

	app.route("/user/update/:id").put(userList.updateUser);
	
/* =================== Update User ============================*/

	app.route("/user/delete/:id").delete(userList.deleteUser);
	
		
};
