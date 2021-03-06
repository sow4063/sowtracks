var fs = require('fs');
var path = require('path');
var songController = require('./db/song/songController.js');
var multer = require('multer');
var zip = require('express-zip');
var auth = require('./auth/auth.js');

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

  // passport settings
  require('./auth/passport.js').setup(app);

  app.get('/account', auth.ensureAuthenticated, function(req, res, next) {
    // res.render('account', {
    //   title: 'Account',
    //   name: req.user.displayName, // 패스포트를 통해 저장된 유저정보
    //   user: JSON.stringify(req.user)
    // });

    res.send( {
      title: 'Account',
      name: req.user.displayName, // 패스포트를 통해 저장된 유저정보
      user: JSON.stringify(req.user)
    });

  });

  app.get('/imgdown/:id', function(req, res, next){
    
    console.log('download image req =>>>>>>>>>>>>>>>>>>>>>>> ', req.params );

    var filename = req.params.id;
    var filePath = 'uploads/img/' + filename;

    //[ for single file ]
    res.download( filePath, filename, function(err){
      if( err ) {
        // Handle error, but keep in mind the response may be partially-sent
        // so check res.headersSent
        console.log('error on res.download of a image', err );
      } else {
        // decrement a download credit, etc.
        console.log('success on res.download of a image');
      }
    });

  });
  
  app.get('/download', function(req, res, next){
    
    console.log('download req =>>>>>>>>>>>>>>>>>>>>>>> ', req.query );

    var files = [];

    for( var song in req.query ) {

      var filename = req.query[song];
      var filePath = 'uploads/' + filename;
      
      console.log('filePath =>> ', filePath );
      
      let obj = {};
      obj['path'] = filePath;
      obj['name'] = filename;

      files.push(obj);

      // [ for single file ]
      // res.download( filePath, filename, function(err){
      //   if (err) {
      //     // Handle error, but keep in mind the response may be partially-sent
      //     // so check res.headersSent
      //     console.log('error on res.download', err );
      //   } else {
      //     // decrement a download credit, etc.
      //     console.log('success on res.download');
      //   }
      // });
    }

    console.log('files =>>>> ', files );
    
    res.zip( files );

  });

	app.get('/stream/:id', function(req, res){

    console.log('stream song req =>>>>>>>>>>>>>>>>>>>>>>> ', req.params );

    var filename = req.params.id;
    var filePath = 'uploads/' + filename;
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
    	console.log('error of readStream', err );
      res.end(err);
    });

	});
	
	app.get('/searchsong', songController.searchSong );
	app.post('/insertsong', songController.insertSong );
	app.post('/upload', upload.array('uploadfile', 20), function(req, res) {    
		console.log("upload.array => ", req.files );
    //res.status(200).send( "upload success message from server ===>>>>>>>>>>>>" );
    songController.insertSong(req, res);
    res.status(200).send( "upload success message from server ===>>>>>>>>>>>>" );
  });
	
	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
	  res.sendfile( './dist/index.html');
	});

};