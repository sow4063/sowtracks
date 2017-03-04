import templateUrl from './download.html'

export const DownloadComponent = {
	bindings: {
    downloadData: '<',
    downfiles: '<'
	},
  templateUrl,
  controller: class DownloadComponent {

    constructor(DownloadService){
      'ngInject';
      this.downloadService = DownloadService;
    }

    $onInit() {
    	this.newDownload = {
    		keyword: '',
    		selected: 'title' // 0: default - by title, 1: by artist
    	};

    	this.downloads = [];
      this.downfiles = [];
    }

    $onChanges(changes) {
      console.log('changes....', changes);
    	if( changes.downloadData ) {
        this.downloads = Object.assign({}, this.downloads);
    	}
    }

    onSubmit() {

      console.log('downloadFiles(b) =>>>>>>>>', this.downfiles, this.downloadData, this.downloads );

      if( !this.downfiles ) return;

      console.log('downloadFiles(a) =>>>>>>>>', this.downfiles );
    } // onSubmit

    //
    // GET THE FILE INFORMATION.
    getFileDetails(e) {

      console.log('getFileDetails', e.files );

      this.downfiles = [];
      
      // STORE THE FILE OBJECT IN AN ARRAY.
      for (var i = 0; i < e.files.length; i++) {
        this.downfiles.push( e.files[i] )
      }
    };

    // NOW UPLOAD THE FILES.
    downloadFiles() {

      console.log('downloadFiles', this.downfiles );

      this.downloadService.getDownload()
          //.then( response => this.downloads = response );
          .then( console.log('success on downloadfile') );

      // // FILL FormData WITH FILE DETAILS.
      // var data = new FormData();

      // for( var file in this.files ) {
      //   let blob = new Blob([this.files[file]], { type: "audio/mp3"});
      //   data.append("downloadfile", blob, this.downfiles[file].name );
      // }

      // // ADD LISTENERS.
      // var objXhr = new XMLHttpRequest();
      // //objXhr.addEventListener("progress", updateProgress, false);
      // //objXhr.addEventListener("load", transferComplete, false);
      
      // // SEND FILE DETAILS TO THE API.
      // objXhr.open("GET", "/download");
      // //objXhr.open("POST", "http://localhost:8080/upload", true );
      // objXhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
      // objXhr.send( data );
      
    }

  } // controller
};


