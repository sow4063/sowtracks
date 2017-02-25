var songController = require('./db/song/songController.js');

module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes
	app.get('/searchsong', songController.searchSong );
	
	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
	  res.sendFile('./dist/index.html');
	});

};