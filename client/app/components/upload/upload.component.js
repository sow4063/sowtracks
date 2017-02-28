import templateUrl from './upload.html'

export const UploadComponent = {
	bindings: {
    uploadData: '<',
    files: '<'
	},
  templateUrl,
  controller: class UploadComponent {

    constructor(UploadService){
      'ngInject';
      this.uploadService = UploadService;
    }

    $onInit() {
    	this.newUpload = {
    		keyword: '',
    		selected: 'title' // 0: default - by title, 1: by artist
    	};

    	this.uploads = [];
      this.files = [];
    	//this.searchService.getSearches().then( response => this.searches = response );
    }

    $onChanges(changes) {
      console.log('changes....', changes);
    	if( changes.uploadData ) {
        this.uploads = Object.assign({}, this.uploads);
    	}
    }

    onSubmit() {

      console.log('uploadFiles(b) =>>>>>>>>', this.files, this.uploadData, this.uploads );

      if( !this.files ) return;

      console.log('uploadFiles(a) =>>>>>>>>', this.files );

      // this.newUpload = {
      //   keyword: '',
      //   selected: 'title'
      // };

      // with EventEmitter wrapper
      // this.onAddSearch(
      //   this.EventEmitter({
      //     search: this.search
      //   })
      //);

    // addUpload( {upload} ){
    // 	console.log('upload =>>>>>>>>>>>', upload );
    //   if( !upload ) return;
    //   //this.searches.unshift( search );
    //   this.uploadService.postUpload(upload.keyword, upload.selected).then( response => this.searches = response );
    //   this.newUpload = {
    //     keyword: '',
    //     selected: 'title'
    //   };
    } // onSubmit

    //
    // GET THE FILE INFORMATION.
    getFileDetails(e) {

      console.log('getFileDetails', e.files.length );

      this.files = [];
      
      // STORE THE FILE OBJECT IN AN ARRAY.
      for (var i = 0; i < e.files.length; i++) {
        this.files.push( e.files[i] )
      }
    };

    // NOW UPLOAD THE FILES.
    uploadFiles() {

      console.log('uploadFiles', this.files );

      // FILL FormData WITH FILE DETAILS.
      var data = new FormData();

      for( var file in this.files ) {
        data.append("uploadfile", this.files[file].data );
      }

      // ADD LISTENERS.
      var objXhr = new XMLHttpRequest();
      //objXhr.addEventListener("progress", updateProgress, false);
      //objXhr.addEventListener("load", transferComplete, false);
      
      objXhr.setRequestHeader('X-Requested-With','XMLHttpRequest');

      // SEND FILE DETAILS TO THE API.
      //objXhr.open("POST", "/upload");
      objXhr.open("POST", "http://localhost:8080/upload", true );
      objXhr.send( data );
    }

    // UPDATE PROGRESS BAR.
    // updateProgress(e) {
    //   if(e.lengthComputable) {
    //     document.getElementById('pro').setAttribute('value', e.loaded);
    //     document.getElementById('pro').setAttribute('max', e.total);
    //   }
    // }

    // CONFIRMATION.
    transferComplete(e) {
      alert("Files uploaded successfully.");
    }
    
    //

  } // controller
};


