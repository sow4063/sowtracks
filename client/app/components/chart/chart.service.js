export class ChartService {
	constructor($http) {
		'ngInject';
		this.$http = $http;
	}

	getChart() {
		console.log('	getChart() =>>>>>>>.');

    return this.$http({
      method: 'GET',
      url: '/searchsong',
      params: {'keyword': '*', 'searchCondition': '*'}
    })
    .then(function (resp) {
    	console.log('getChart return from server ==>>>>>>>>>> ', resp.data );
      return resp.data;
    });
	}
  
}
