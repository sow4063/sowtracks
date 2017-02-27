/* ----- search/search.service.js ----- */
export class SearchService {
	constructor($http) {
		'ngInject';
		this.$http = $http;
	}

	getSearches() {
		//return this.$http.get('/searchsong').then(response => response.data);
    console.log('	getSearches() ');

		return this.$http({
      method: 'GET',
      url: '/searchsong',
      params: {keyword: '*', searchCondition: 'title'}
    })
    .then(function (resp) {
    	console.log('return data from server ==>>>>>>>>>> ', resp.data);
      return resp.data;
    });
	}
}
