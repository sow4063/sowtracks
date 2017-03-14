import templateUrl from './search.html'

export const SearchComponent = {
	bindings: {
    searchData: '<'
	},
  templateUrl,
  controller: class SearchComponent {

    constructor(SearchService, $stateParams){
      'ngInject';
      this.searchService = SearchService;
      this.$stateParams = $stateParams;
      console.log('SearchCompoent constructor =>>>>>>>>>>>', this.$stateParams );
    }

    $onInit($stateParams) {
    	this.newSearch = {
    		keyword: '',
    		selected: 'title' // 0: default - by title, 1: by artist
    	};

    	this.searches = [];
      console.log('SearchComponent onInit =>>>>>>>>>> ', this.$stateParams );
    	this.searchService.getSearches(this.$stateParams.keyword).then( response => this.searches = response );
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
      this.searchService.getSearches(search.keyword, search.selected)
        .then( response => this.searches = response );
      
      this.newSearch = {
        keyword: '',
        selected: 'title'
      };
    }

  }
};


