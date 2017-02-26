import angular from 'angular'
import uiRouter from 'angular-ui-router';
import { SearchComponent } from './search.component'
import { SearchService } from './search.service';
import { SearchFormModule } from './search-form/search-form.module';
import { SearchListModule } from './search-list/search-list.module';
import './search.scss'

export const SearchModule = angular
  .module('search', [
    SearchFormModule,
    SearchListModule,
  	uiRouter
  ])
  .component('search', SearchComponent)
  .service('SearchService', SearchService)
  .config( ($stateProvider, $urlRouterProvider) => {
    'ngInject';
    $stateProvider
      .state('searches', {
        url: '/searches',
        component: 'search',
        resolve: {
        	searchData: SearchService => SearchService.getSearches()
        }
      });
    $urlRouterProvider.otherwise('/');
  })
  .name
