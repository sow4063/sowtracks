var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var server = require('../server.js');
var fs = require('fs');

var Song = require('../server/db/song/songController.js');

/////////////////////////////////////////////////////
// NOTE: these tests are designed for mongo!
/////////////////////////////////////////////////////

describe('', function() {

  var data = [];
  var song = {};

  song.title = 'Encore.mp3';
  song.album = 'test';
  song.artist = 'kimsin';
  song.janre = 'classic';
  song.songPath = '/Users/water4063/Documents/dev/music/upload/Encore.mp3';

  data.push(song);
  
  describe('Song Creation:', function() {

    it('Remove a song', function(done) {
      request(server)
        .post('/removesong')
        .send({title: song.title})
        .end(function(err, res) {
          console.log('err = ', err );
          //console.log('result = ', res );
          done();
        });
    });

    it('Insert a new Song', function(done) {
      request(server)
        .post('/insertsong')
        .send({'data': data})
        .expect(200)
        .end(done);
    });

    it('Search the Song', function(done) {
      request(server)
        .get('/searchsong')
        .query({'params': {'keyword': song.title, 'searchCondition': 'title'} } )
        .end(function(err, res) {
          if( err ) {
            console.log('Error on search song = ', err );
            throw err;
          }
          
          console.log('res =>>>>>>>>>> ', res.body );
          
          expect(res.body.length).to.equal(1);

          done();
        });
    });

  }); // 'Song Insert'

  describe('download music ', function(done){
    it('downlaod the Song', function(done) {
      request(server)
        .get('/downlaodsong')
        .query({'params': {'keyword': song.title} } )
        .end(function(err, res) {
          if( err ) {
            console.log('Error on download song = ', err );
            throw err;
          }
          
          console.log('res =>>>>>>>>>> ', res.body );
          
          expect(res.body.length).to.equal(1);

          // save mp3 to lcoal
          var songMedia = res.body[0];
          var fileName = '/Users/water4063/Documents/dev/music/download/' + song.title;
          console.log('filename ===> ', fileName );
          fs.writeFileSync( fileName, songMedia );

          done();
        });
    });
  }); // downd music

});
