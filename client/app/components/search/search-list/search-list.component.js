/* ----- search/search-list/search-list.component.js ----- */
import templateUrl from './search-list.html';

export const SearchListComponent = {
  bindings: {
    search: '<',
    onAddSearch: '&'
  },
  templateUrl,
  controller: class SearchListComponent {
    constructor() {
      'ngInject';
    }
    
  }
};

