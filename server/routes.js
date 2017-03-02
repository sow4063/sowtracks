var songController = require('./db/song/songController.js');
var multer = require('multer');
var _storage = multer.diskStorage({
  destination: function (req, file, cb) {
     cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
     cb(null, file.originalname);
   }
 });

var upload = multer({ storage: _storage });

module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes
	app.get('/searchsong', songController.searchSong );
	app.post('/insertsong', songController.insertSong );
	app.post('/upload', upload.array('uploadfile', 10), function(req, res) {    
		console.log("upload.array => ", req.files );
    res.json( "upload result from server =>>>>>>>>>>>>>>>>>>>>>>>");
  });
	
	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
	  res.sendfile( './dist/index.html');
	});

};