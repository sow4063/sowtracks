import angular from 'angular'
import uiRouter from 'angular-ui-router';
import { rootComponent } from './root.component'
import { ComponentsModule } from './components/components.module';
import { CommonModule } from './common/common.module';
import './root.scss'

export const root = angular
  .module('root', [
  	CommonModule,
  	ComponentsModule
  ])
  .component('root', rootComponent)
  .name
