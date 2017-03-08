import templateUrl from './nav.html'

export const navComponent = {
	bindings: {
    user: '<',
    onLogout: '&'
  },
  templateUrl,
  controller: class NavComponent {
    constructor($state){
      'ngInject';
      this.$state = $state;
    }

    $onInit(){
      this.currentNavItem = 'page1';
      this.keyword = '';
    }

    onSubmit() {
      console.log('nav onSubmit =>>>>>>>> ', this.keyword );

      // navigate to the search view
      this.$state.transitionTo('searches', {
        keyword: this.keyword
      }, {
        reload: true,
        notify: true
      });
      
    } // onSubmit

  } // controller

} // component
