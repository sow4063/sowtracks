import templateUrl from './chart-list.html';

export const ChartListComponent = {
  bindings: {
    chart: '<'
  },
  templateUrl,
  controller: class ChartListComponent {
    constructor($http, Store) {
      'ngInject';
      this.$http = $http;
      
      this.onPlay = (title) => {
        Store.set({ song: title });
      };
      
    }

  }

};

