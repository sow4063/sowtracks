import templateUrl from './search.html'

export const SearchComponent = {
	bindings: {
    searchData: '<'
	},
  templateUrl,
  controller: class SearchComponent {

    constructor(SearchService){
      'ngInject';
      this.searchService = SearchService;
    }

    $onInit() {
    	this.newSearch = {
    		keyword: '',
    		selected: 'title' // 0: default - by title, 1: by artist
    	};

    	this.searches = [];
    	//this.searchService.getSearches().then( response => this.searches = response );
    }

    $onChanges(changes) {
    	if( changes.searchData ) {
        this.searches = Object.assign({}, this.searchData);
    	}
    }

    addSearch( {search} ){
    	console.log('search =>>>>>>>>>>>', search);
      if( !search ) return;
      //this.searches.unshift( search );
      this.searchService.getSearches(search.keyword, search.selected).then( response => this.searches = response );
      this.newSearch = {
        keyword: '',
        selected: 'title'
      };
    }
  }
};


