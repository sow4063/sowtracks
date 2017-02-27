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

    $onChanges(changes) {
      console.log('changes', this.searches );
      if( changes.searches ) {
        console.log('changes.searches', this.searches );
        this.searches = Object.assign({}, this.searches) || {song:'testsong'};
        console.log('after saving changes.searches', this.searches );
      }
    }
    
  }
};

