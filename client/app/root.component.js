import templateUrl from './root.html'
export const rootComponent = {
  templateUrl,
  controller: class RootComponent {
    constructor($rootScope){
      'ngInject'
    }
  }
}
