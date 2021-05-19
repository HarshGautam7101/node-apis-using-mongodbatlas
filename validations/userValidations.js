/*** User Validation schema ***/

const Joi = require('joi'); 

/*** Create User registrations ***/

const userSchemas = { 
		/** Create User Validations **/
		userPOST: Joi.object().keys({ 
			email: Joi.string().email().required(), 
			password: Joi.string().min(3).max(30).required(),
			confirm_password: Joi.any().valid(Joi.ref('password')).required().label('Confirm password').messages({ 'any.only': '{{#label}} does not match' }),
			firstname: Joi.string().min(2).max(50).required(),
			lastname: Joi.string().min(2).max(50).required(),
			weight:Joi.required(),
			exp_in_training:Joi.required(),
			height:Joi.required(),
			day:Joi.required(),
			month:Joi.required(),
			year:Joi.required()
		}),
		
		/** Login User Validations **/
		userLogin: Joi.object().keys({ 
			email: Joi.string().email().required(), 
			password: Joi.string().min(3).max(30).required()
		})
		
	}; 
module.exports = userSchemas;