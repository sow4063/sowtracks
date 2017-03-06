var ensureAuthenticated = function (req, res, next) {
  if( req.isAuthenticated() ) { 
  	console.log('success on ensureAuthenticated')
  	return next(); 
  }
  else {
    console.log('fail on ensureAuthenticated')
  
    res.redirect('/login');	
  }
  
  
};

module.exports.ensureAuthenticated = ensureAuthenticated;
