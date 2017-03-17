import templateUrl from './chart.html'

export const ChartComponent = {
	bindings: {
    chartData: '<'
	},
  templateUrl,
  controller: class ChartComponent {

    constructor(ChartService, $stateParams, Store){
      'ngInject';
      this.chartService = ChartService;
      this.$stateParams = $stateParams;
      this.state = Store.get();
      console.log('SearchCompoent constructor =>>>>>>>>>>>', this.$stateParams );
    }

    $onInit($stateParams) {
    	this.chart = [];
      console.log('ChartComponent onInit =>>>>>>>>>> ', this.$stateParams );
    	this.chartService.getChart().then( response => this.chart = response );
    }

    $onChanges(changes) {
      console.log('changes =>>>>> ', changes );
    	if( changes.chartData ) {
        this.chart = Object.assign({}, this.chartData);
    	}
    }

  }
};


