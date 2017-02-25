/* ----- search/search-form/search-form.component.js ----- */
import templateUrl from './search-form.html';

export const SearchFormComponent = {
  bindings: {
    search: '<',
    onAddSearch: '&'
  },
  templateUrl,
  controller: class SearchFormComponent {
    constructor(EventEmitter) {
      'ngInject';
      this.EventEmitter = EventEmitter;
    }

    $onChanges(changes) {
      if( changes.search ) {
        this.search = Object.assign({}, this.search);
      }
    }

    onSubmit() {
      if( !this.search.keyword ) return;

      console.log('search.keyword =>>>>>>>>', this.search.keyword );
      // with EventEmitter wrapper
      this.onAddSearch(
        this.EventEmitter({
          search: this.search
        })
      );

      // without EventEmitter wrapper
      // this.onAddSearch({
      //   $event: {
      //     search: this.search
      //   }
      // });
    }
  }
};

