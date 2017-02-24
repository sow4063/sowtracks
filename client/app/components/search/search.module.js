import angular from 'angular'
import uiRouter from 'angular-ui-router';
import { searchComponent } from './search.component'
import './search.scss'

export const SearchModule = angular
  .module('search', [
  	uiRouter
  ])
  .component('search', searchComponent)
  // .config(($stateProvider, $urlRouterProvider) => {
  //   'ngInject';
  //   $stateProvider
  //     .state('search', {
  //       url: '/search',
  //       component: 'search'
  //     });
  //   $urlRouterProvider.otherwise('/');
  // })
  .name
