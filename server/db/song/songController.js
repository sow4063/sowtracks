var fs = require('fs');
var path = require('path');
var Q = require('q');
var song = require('./songModel.js');

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
      	if( songs.length ) {
      		console.log('songs exists!!! ::: ', songs.length );
          res.send( songs );
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

    var songs = [];

    console.log('req.body.data => ', req.body.data );

    for( var i = 0; i < req.body.data.length; i++ ) {
      let input = req.body.data[i];
      let song = {};

      song.title = input.title;
      song.album = input.album;
      song.artist = input.artist;
      song.janre = input.janre;
      
      let songPath = input.songPath;
      song.media = {};
    
      song.media['data'] = fs.readFileSync( songPath );
      song.media.contentType = 'audio/mp3';//path.extname( songPath );

      songs.push(song);
    }

		console.log('insertSong = ', songs.length );

    createSong( songs )
	    .then(function(result){
        console.log('insert result = ', result)
	      res.json( result );
	    })
	    .fail(function(error){
        console.log('insertSong = ', error );
	      res.json( error );
	    });
    
  }
  
};
