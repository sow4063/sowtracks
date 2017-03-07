import angular from 'angular'
//import uiRouter from 'angular-ui-router';
import { footerComponent } from './footer.component'
import './footer.scss'

export const FooterModule = angular
  .module('footer', [
  	//uiRouter
  ])
  .component('footer', footerComponent)
  .name
