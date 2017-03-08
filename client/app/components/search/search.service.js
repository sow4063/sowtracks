/* ----- search/search.service.js ----- */
export class SearchService {
	constructor($http) {
		'ngInject';
		this.$http = $http;
	}

	getSearches(keyword, condition) {
		//return this.$http.get('/searchsong').then(response => response.data);
    console.log('	getSearches(keyword, condition) =>>>>>>>.', keyword, condition);

    condition = !condition ? 'title': condition;
    
		return this.$http({
      method: 'GET',
      url: '/searchsong',
      params: {'keyword': keyword, searchCondition: condition}
    })
    .then(function (resp) {
    	console.log('return data from server ==>>>>>>>>>> ', resp.data);
      return resp.data;
    });
	}
}
