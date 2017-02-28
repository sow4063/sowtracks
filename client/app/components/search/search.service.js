/* ----- search/search.service.js ----- */
export class SearchService {
	constructor($http) {
		'ngInject';
		this.$http = $http;
	}

	getSearches(keyword, selected) {
		//return this.$http.get('/searchsong').then(response => response.data);
    console.log('	getSearches(keyword) =>>>>>>>.', keyword, selected);

		return this.$http({
      method: 'GET',
      url: '/searchsong',
      params: {'keyword': keyword, searchCondition: selected}
    })
    .then(function (resp) {
    	console.log('return data from server ==>>>>>>>>>> ', resp.data);
      return resp.data;
    });
	}
}
