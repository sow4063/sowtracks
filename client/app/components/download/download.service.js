
export class DownloadService {
	constructor($http) {
		'ngInject';
		this.$http = $http;
	}

  // Save as Code
	saveAs(blob, fileName){
	    var url = window.URL.createObjectURL(blob);

	    var doc = document.createElement("a");
	    doc.href = url;
	    doc.download = fileName;
	    doc.click();
	    window.URL.revokeObjectURL(url);
	}

	getDownload(keyword, selected) {
		console.log('	getDownooad =>>>>>>>.', keyword, selected);

		return this.$http({
      method: 'GET',
      url: '/download',
      params: {'keyword': 'Encore', 'searchCondition': selected},
      responseType: 'blob' // blob, arraybuffer
    })
    .then(function (resp) {
    	
    	console.log('return data from server ==>>>>>>>>>> ', resp.data.length );

    	var blob = new Blob([resp.data], { type: "audio/mp3"} );

    	console.log('blob =>>>> ',  blob );

      var fileName = 'Encore.mp3';

      var url = window.URL.createObjectURL(blob);

	    var doc = document.createElement("a");
	    doc.href = url;
	    doc.download = fileName;
	    doc.click();
	    window.URL.revokeObjectURL(url);
      
    });
	}
}
