import templateUrl from './nav.html'

export const navComponent = {
	bindings: {
    user: '<',
    searchCondition: '<',
    onLogout: '&'
  },
  templateUrl,
  controller: class NavComponent {
    constructor(){
      'ngInject'
    }

    $onInit(){
      this.currentNavItem = 'page1';
    }
  }
}
