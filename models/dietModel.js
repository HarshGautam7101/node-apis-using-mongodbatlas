/** Create Model User Data **/

'use strict';

/** Import mongoose **/

const mongoose = require("mongoose");

/** Declare schema and assign Schema class **/
    
const Schema = mongoose.Schema;

/** Create Schema Instance and add schema propertise **/

const DietSchema = new Schema({
	meal_name:{
    type:String
    },
    calories:{
        type:String
        },
    carbs:{
            type:String
            },
    fat:{
                type:String
                },
    protein:{
                    type:String
                    },
    how_to_cook:{
                        type:String
                    },
     calorie_category:{
                        type:String
                    }      

});

/** create and export model **/
module.exports = mongoose.model("diets", DietSchema);