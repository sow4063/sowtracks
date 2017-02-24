var Q = require('q');
var user = require('./userModel.js');

// Promisify a few mongoose methods with the `q` promise library
var findUsers  = Q.nbind( user.find, user );
var createUser = Q.nbind( user.create, user );
var removeUser = Q.nbind( user.remove, user );
var updateUser = Q.nbind( user.findOneAndUpdate, user );

module.exports = {

  updateUser: function(req, res, next){

    console.log('updateUser = ', req.body.email );

    var user = {
      username : req.body.username,
      address : req.body.address,
      zipcode : req.body.zipcode
    };

    updateUser( {email: req.query.email}, user, {new: true} )
      .then(function(result) {
        if( result.length ) {
          console.log('update user!!! ::: ', result );
          res.send( result );
        } 
        else {
          res.json( [] );
        }
        
      })
      .fail(function (error) {
        console.log('error update user!!! ::: ', error );
        res.json( error );
      });
  },

	searchUser: function(req, res, next){

    console.log('searchUsers = ', req.query.email );

		findUsers( {email: req.query.email} )
      .then(function(users) {
      	if( users.length ) {
      		console.log('users exists!!! ::: ', users.length );
          res.send( users );
        } 
        else {
          res.json( [] );
        }
      	
      })
      .fail(function (error) {
        console.log('error search user!!! ::: ', error );
      	res.json( error );
      });
	},

  removeUser: function(req, res, next){

  	console.log('removeUser = ', req.body.email );

    removeUser({email: req.body.email})
      .then(function(result){
        res.json( result );
      })
      .fail(function(error){
        console.log('error remove user!!! ::: ', error );
        res.json( error );
      });
  },

	insertUser: function (req, res, next) {

		var user = {};

    user.email = req.body.email;
    user.userflag = req.body.userflag;

		console.log('insertUser = ', user );

    createUser( user )
	    .then(function(result){
	      res.json( result );
	    })
	    .fail(function(error){
        console.log('insertUser = ', error );
	      res.json( error );
	    });
    
  }
};
