var fs = require('fs');
var path = require('path');
var Q = require('q');
var song = require('./songModel.js');
var mm = require('musicmetadata');
 
// Promisify a few mongoose methods with the `q` promise library
var findSongs  = Q.nbind( song.find, song );
var createSong = Q.nbind( song.create, song );
var removeSong = Q.nbind( song.remove, song );
var updateSong = Q.nbind( song.findOneAndUpdate, song );

module.exports = {

  updateSong: function(req, res, next){

    console.log('updateSong = ', req.body.title );

    var song = {
      click : req.body.click,
    };

    updateSong( {title: req.query.title}, song, {new: true} )
      .then(function(result) {
        if( result.length ) {
          console.log('update song!!! ::: ', result );
          res.send( result );
        } 
        else {
          res.json( [] );
        }
        
      })
      .fail(function (error) {
        console.log('error update song!!! ::: ', error );
        res.json( error );
      });
  },

  downloadSong: function(req, res, next){

    var keyword = req.query.params.keyword.split('.')[0];

    console.log('downlaodSong keyword = ', keyword );

    findSongs( {'title': { "$regex": keyword }} )
      .then(function(song) {
        if( song.length ) {
          
          res.setHeader('Content-type', song[0].media.contentType );
          console.log('download song exists!!! ::: ', song[0] );
          console.log('res Content-Type => ', res.getHeader('Content-Type'));
          res.send( [song[0].media.data] );
        } 
        else {
          res.json( [] );
        }
        
      })
      .fail(function (error) {
        console.log('error downlaod song!!! ::: ', error );
        res.json( error );
      });
  },

	searchSong: function(req, res, next){

    console.log('req =>>>>>>>>>>>>>>>>>>>>>>>', req.query);

    var condition = req.query.searchCondition;
    var keyword = req.query.keyword.split('.')[0];

    console.log('searchSong condition = ', condition );
    console.log('searchSong keyword = ', keyword );

    var query = {};

    if( keyword === '*' ) {
      query = {};
    }
    else if( condition === 'title' ) {
      query['title'] = { "$regex": keyword };
    }
    else if( condition === 'artist' ) {
      query['artist'] = { "$regex": keyword };
    }

    console.log('query =>>>>>>>', query );

		findSongs( query )
      .then(function(songs) {
      	console.log('found songs ::: ', songs.length );
          
        if( songs.length ) {
          res.json( songs );
        } 
        else {
          res.json( [] );
        }
      	
      })
      .fail(function (error) {
        console.log('error search song!!! ::: ', error );
      	res.json( error );
      });
	},

  removeSong: function(req, res, next){

  	console.log('removeSong = ', req.body.title );

    removeSong( {title: req.body.title} )
      .then(function(result){
        console.log('success remove song!!! ::: ' );
        res.json( 'success remove song!!! ::: ' );
      })
      .fail(function(error){
        console.log('error remove song!!! ::: ', error );
        res.json( error );
      });
  },

	insertSong: function (req, res, next) {
   
    //var songs = [];

    for( let i = 0; i < req.files.length; i++ ) {

      let file = req.files[i];
      let song = {};

      /*
      var rs = fs.createReadStream("some large file")
      .on("data", function(data){
          console.log("got data");
          l += data.length;
          if (l > 655360) {
              rs.close();
              console.log("close");
          }
      })
      .on("end", function(){
          console.log("shouldn't be logged");
      });
      */
      
      var readableStream = fs.createReadStream( file.path );

      var parser = mm( readableStream, function (err, metadata) {

        if( err ) {
          console.log('err read metadata ', err );
        }
        else {
          console.log('metadata =>>> ', metadata );

          song.title = metadata.title;
          song.album = metadata.album;
          song.artist = metadata.artist.join('');
          song.genre = metadata.genre.join('');
          
          // save image
          var picName = song.title + '.' + metadata.picture[0].format ;
          song.picture = picName;

          // fs.writeFileSync( picPath, metadata.picture[0].data );
          // song.picture = {};
          // song.picture.contentType = metadata.picture[0].format;
          // song.picture.data = metadata.picture[0].data;

          createSong( song )
            .then(function(result){
              console.log('insert result = ', result );
              //res.status(200).json( result );
            })
            .fail(function(error){
              console.log('insertSong = ', error );
              //return res.status(500).json( error );
            });
          
          //songs.push(song);
          console.log('i th =>>>>>> ', i );
        }

        //readableStream.close();
      }); // parser
      
    } // for all files

    //console.log('insertSong = ', songs.length );

    // createSong( songs )
	   //  .then(function(result){
    //     console.log('insert result = ', result );
	   //    res.status(200).json( result );
	   //  })
	   //  .fail(function(error){
    //     console.log('insertSong = ', error );
	   //    res.status(500).json( error );
	   //  });
    
  } // insertSong
  
};
