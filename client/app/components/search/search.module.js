import angular from 'angular'
import uiRouter from 'angular-ui-router';
import { searchComponent } from './search.component'
import './search.scss'

export const SearchModule = angular
  .module('search', [
  	uiRouter
  ])
  .component('search', searchComponent)
  .name
