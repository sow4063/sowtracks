
export class DownloadService {
	constructor($http) {
		'ngInject';
		this.$http = $http;
	}

	getDownload(keyword, selected) {
		console.log('	getDownooad =>>>>>>>.', keyword, selected);

		var songs = [];
		
		songs.push('Encore.mp3');
		songs.push('Finale.mp3');

		return this.$http({
      method: 'GET',
      url: '/download',
      //params: {'keyword': 'Encore', 'searchCondition': selected},
      params: songs,
      responseType: 'blob' // blob, arraybuffer
    })
    .then(function (resp) {
    	
    	console.log('return data from server ==>>>>>>>>>> ', resp );
      console.log('Content-Disposition: ' + resp.headers('Content-Disposition'));

    	var filename = resp.headers('Content-Disposition').match(/filename="(.+)"/)[1];

    	// console.log('header =>> ', header );
      console.log('filename =>> ', filename );

    	var blob = new Blob([resp.data], { type: "audio/mp3"} );

    	console.log('blob =>>>> ',  blob );

      var url = window.URL.createObjectURL(blob);

	    var doc = document.createElement("a");
	    doc.href = url;
	    doc.download = filename;
	    doc.click();
	    window.URL.revokeObjectURL(url);
      
    });
	}
}
