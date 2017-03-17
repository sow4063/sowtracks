import angular from 'angular'
import uiRouter from 'angular-ui-router';
import { SearchComponent } from './search.component'
import { SearchService } from './search.service';
import { SearchFormModule } from './search-form/search-form.module';
import { SearchListModule } from './search-list/search-list.module';
import './search.scss'

export const SearchModule = angular
  .module('search', [
    uiRouter,
    SearchFormModule,
    SearchListModule
  ])
  .component('search', SearchComponent)
  .service('SearchService', SearchService)
  .config( ($stateProvider, $urlRouterProvider) => {
    'ngInject';
    $stateProvider
      .state('searches', {
        url: '/searches/:keyword',
        component: 'search',
        // resolve: {
        // 	searchData: SearchService => SearchService.getSearches()
        // }
      });
    $urlRouterProvider.otherwise('/');
    
  })
  // declare the "Store" or whatever name that make sense
  // for you to call it (Model, State, etc.)
  .factory('Store', () => {
    // hold a local copy of the state, setting its defaults
    const state = {
        data: {
          song: ''
        }
    };

    // expose basic getter and setter methods
    return {
      get() {
        return state.data;
      },
      set(data) {
        Object.assign( state.data, data );
      },
    };
  })
  .name
