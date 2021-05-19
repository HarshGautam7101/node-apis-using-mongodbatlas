/** Create Model User Data **/

'use strict';

/** Import mongoose **/

const mongoose = require("mongoose");

/** Declare schema and assign Schema class **/
    
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

/** Create Schema Instance and add schema propertise **/

const GoalsSchema = new Schema({
   fitness_goal:{
       type:String,
       required: true
   },
   req_calories:{
       type:String,
       required: true
   },
   req_protein:{
       type:String,
       required: true
   },
   req_fat:{
       type:String,
       required: true
   },
   training_level:{
       type:String,  
       required: true
   },
   
   dietIds: [{
    type: ObjectId,
    ref: 'diets' // Reference to some EventSchema
    }],
  
  userId: { type: Schema.Types.ObjectId, ref: 'users' },
  title: String,
   
  createdOn: {
    type:Date,
    default:Date.now
}

});

/** create and export model **/
module.exports = mongoose.model("usergoals", GoalsSchema);