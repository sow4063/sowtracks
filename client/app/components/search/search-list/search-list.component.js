/* ----- search/search-list/search-list.component.js ----- */
import templateUrl from './search-list.html';

export const SearchListComponent = {
  bindings: {
    searches: '<'
  },
  templateUrl,
  controller: class SearchListComponent {
    constructor() {
      'ngInject';
    }

    $onInit() {
      this.searches = [];
    }

    $onChanges(changes) {
      console.log('changes', this.searches );
      if( changes.searches ) {
        console.log('changes.searches', this.searches );
        this.searches = Object.assign({}, this.searches);
        console.log('after saving changes.searches', this.searches );
      }
    }
    
  }
};

