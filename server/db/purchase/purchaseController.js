var Q = require('q');
var purchase = require('./purchaseModel.js');
var mongoose = require('mongoose');

// Promisify a few mongoose methods with the `q` promise library
var findPurchase   = Q.nbind( purchase.find, purchase );
var createPurchase = Q.nbind( purchase.create, purchase );

module.exports = {

	searchPurchase: function(req, res, next){

    console.log('searchUsers = ', req.query.purchaseid );

    findPurchase( {purchaseid: req.query.purchaseid} )
      .then(function(purchase) {
      	if( purchase.length ) {
      		console.log('purchase exists!!! ::: ', purchase.length );
          res.send( purchase );
        } 
        else {
          res.json( [] );
        }
      	
      })
      .fail(function (error) {
        console.log('error search purchase!!! ::: ', error );
      	res.json( error );
      });
	},

	insertPurchase: function (req, res, next) {

    var purchases = [];
    var purchaseid = mongoose.Types.ObjectId();

    for( var i = 0; i < req.body.data.length; i++ ) {
      let buy = req.body.data[i];
      let purchase = {};  

      purchase.purchaseid = purchaseid;
      purchase.song = buy.song;
      purchase.artist = buy.artist;
      purchase.price = buy.price;
    }
		
		console.log('insertPurchase = ', purchaseid );

    createSong( purchases )
	    .then(function(result){
	      res.json( result );
	    })
	    .fail(function(error){
        console.log('insertPurchase = ', error );
	      res.json( error );
	    });
    
  }
};
