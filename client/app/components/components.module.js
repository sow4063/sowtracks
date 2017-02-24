import angular from 'angular';
import uiRouter from 'angular-ui-router';
import { SearchModule } from './search/search.module';

export const ComponentsModule = angular
  .module('components', [
  	SearchModule
  ])
  .name


