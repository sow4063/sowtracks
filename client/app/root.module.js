import angular from 'angular'
import uiRouter from 'angular-ui-router';
import { rootComponent } from './root.component'
import { ComponentsModule } from './components/components.module';
import { CommonModule } from './common/common.module';

import 'bootstrap/dist/css/bootstrap.css';
//import './root.scss';

export const root = angular
  .module('root', [
  	uiRouter,
  	ComponentsModule,
  	CommonModule
  ])
  .component('root', rootComponent)
  .name
