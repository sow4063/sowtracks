/* ----- search/search-form/search-form.module.js ----- */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import {SearchListComponent} from './search-list.component';
//import './search-list.scss';

export const SearchListModule = angular
  .module('search.list', [
  	uiRouter
  ])
  .component('searchList', SearchListComponent)
  .name
