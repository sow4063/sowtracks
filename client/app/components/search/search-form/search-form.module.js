/* ----- search/search-form/search-form.module.js ----- */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import {SearchFormComponent} from './search-form.component';
import './search-form.scss';

export const SearchFormModule = angular
  .module('search.form', [
  	uiRouter
  ])
  .component('searchForm', SearchFormComponent)
  .value('EventEmitter', payload => ({$event: payload}))
  .value('EventEmitter', search => ({$event: search}))
  .name
