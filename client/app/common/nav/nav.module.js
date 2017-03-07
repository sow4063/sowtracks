import angular from 'angular'
import uiRouter from 'angular-ui-router';
import { navComponent } from './nav.component';
//import './nav.scss';

export const NavModule = angular
  .module('nav', [
  	uiRouter
  ])
  .component('nav', navComponent)
  .name
