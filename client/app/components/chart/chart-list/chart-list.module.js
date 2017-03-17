import angular from 'angular';
import uiRouter from 'angular-ui-router';
import {ChartListComponent} from './chart-list.component';
import './chart-list.scss';

export const ChartListModule = angular
  .module('chart.list', [
  	uiRouter
  ])
  .component('chartList', ChartListComponent)
  .name
