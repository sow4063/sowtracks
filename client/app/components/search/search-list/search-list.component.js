/* ----- search/search-list/search-list.component.js ----- */
import templateUrl from './search-list.html';

export const SearchListComponent = {
  bindings: {
    searches: '<'
  },
  templateUrl,
  controller: class SearchListComponent {
    constructor($http, Store) {
      'ngInject';
      this.$http = $http;
      
      this.onPlay = (title) => {
        // BOOM! We just set the Store data.
        // No need to notify or anything!
        Store.set({ song: title });
      };
      
    }

  }

};

