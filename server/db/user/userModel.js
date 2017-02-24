// grab the mongoose module
var mongoose = require('../db.config.js');

var userSchema = new mongoose.Schema({
  email : {
  	type : String, required: true
  },

	userflag : {
		type : Boolean, default: false
	},
	
	username : {
		type : String, default: ''
	},
	
	address : {
		type : String, default: ''
	},
	
	zipcode : {
		type : String, default: ''
	},

	created_at : { type: Date }

});

userSchema.pre('save', function(next){
  this.created_at = new Date();
  next();
});

module.exports = mongoose.model('user', userSchema);