var mongoose = require('../db.config.js');

var purchaseSchema = new mongoose.Schema({
  purchaseid: {
    type: String, 
    required: true
  },

	song: {
		type : String, default: ''
	},
	
	artist : {
		type : String, default: ''
	},
	
	price : {
		type : Number, default: 1000
	},
  
	created_at : { type: Date }

});

purchaseSchema.pre('save', function(next){
  this.created_at = new Date();
  next();
});

module.exports = mongoose.model('purchase', purchaseSchema);