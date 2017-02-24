import templateUrl from './search.html'

export const searchComponent = {
  templateUrl,
  controller: class SearchComponent {
    constructor($searchScope){
      'ngInject'
    }
  }
}
