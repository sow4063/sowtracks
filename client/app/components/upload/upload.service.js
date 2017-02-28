export class UploadService {
	constructor($http) {
		'ngInject';
		this.$http = $http;
	}

	postUpload(keyword, selected) {
		//return this.$http.get('/searchsong').then(response => response.data);
    console.log('	postUpooad =>>>>>>>.', keyword, selected);

		return this.$http({
      method: 'POST',
      url: '/upload',
      params: {'keyword': keyword, 'searchCondition': selected}
    })
    .then(function (resp) {
    	console.log('return data from server ==>>>>>>>>>> ', resp.data);
      return resp.data;
    });
	}
}
