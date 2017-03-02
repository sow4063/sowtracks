var fs = require('fs');
var path = require('path');
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
	app.get('/download', function(req, res){

    var filePath = 'uploads/Encore.mp3';
    var stat = fs.statSync( filePath );
    console.log('stat => ', filePath, stat );

    res.writeHead( 200, {
      'Content-Type': 'audio/mp3',
      'Content-Length': stat.size
    });

    var readStream = fs.createReadStream( filePath );
    
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.on('open', function () {
      // This just pipes the read stream to the response object (which goes to the client)
      readStream.pipe( res );
    });

    readStream.on('error', function(err) {
    	console.log('error of readStream', err);
      res.end(err);
    });

	});
	
	app.get('/searchsong', songController.searchSong );
	app.post('/insertsong', songController.insertSong );
	app.post('/upload', upload.array('uploadfile', 10), function(req, res) {    
		console.log("upload.array => ", req.files );
    res.status(200).send( "upload success message from server ===>>>>>>>>>>>>" );
  });
	
	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
	  res.sendfile( './dist/index.html');
	});

};