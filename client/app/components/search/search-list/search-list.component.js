/* ----- search/search-list/search-list.component.js ----- */
import templateUrl from './search-list.html';

export const SearchListComponent = {
  bindings: {
    searches: '<'
  },
  templateUrl,
  controller: class SearchListComponent {
    constructor($http) {
      'ngInject';
      this.$http = $http;
    }

    // $onInit() {
    //   this.searches = [];
    //   this.count = 0;
    // }

    // $onChanges(changes) {
    //   if( changes.searches ) {
    //     this.searches = Object.assign({}, this.searches );
    //     console.log('after saving changes.searches', this.searches );
    //   }
    // }
    
  }
};

