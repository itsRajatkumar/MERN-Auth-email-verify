// requiring importent modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;



// creating databse schema for saving details in database
var SomeModelSchema = new Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    unique: true

  },

  mobile: {
    type: String,
    required: false 

  },

  // storing hashed password
  password:{
    type: String,
    required: true 

  },
  varified:{
    type: Boolean,
    default: false 

  },


});




module.exports = mongoose.model('User', SomeModelSchema );

