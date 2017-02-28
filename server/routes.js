var songController = require('./db/song/songController.js');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes
	app.get('/searchsong', songController.searchSong );
	app.post('/insertsong', songController.insertSong );
	app.post('/upload', upload.array('userfile', 10), function(req, res) {    
		console.log("upload.array => ", req );
    res.json( "upload result from server =>>>>>>>>>>>>>>>>>>>>>>>");
  });
	
	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
	  res.sendfile( './dist/index.html');
	});

};