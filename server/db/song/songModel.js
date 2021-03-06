var mongoose = require('../db.config.js');

var songSchema = new mongoose.Schema({
  title : {
  	type : String, required: true
  },

	album : {
		type : String, default: ''
	},
	
	artist : {
		type : String, default: ''
	},
	
	genre : {
		type : String, default: ''
	},
	
	clicks : {
		type : Number, default: 0
	},

	price : {
		type : Number, default: 1000
	},

	picture : {
		type : String, default: ''
	},

	created_at : { type: Date }

});

songSchema.pre('save', function(next){
  this.created_at = new Date();
  next();
});

module.exports = mongoose.model('song', songSchema);