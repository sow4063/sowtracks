import angular from 'angular'
import uiRouter from 'angular-ui-router';
import { ChartComponent } from './chart.component'
import { ChartService } from './chart.service';
import { ChartListModule } from './chart-list/chart-list.module';
import './chart.scss'

export const ChartModule = angular
  .module('chart', [
    uiRouter,
    ChartListModule
  ])
  .component('chart', ChartComponent)
  .service('ChartService', ChartService)
  .config( ($stateProvider, $urlRouterProvider) => {
    'ngInject';
    $stateProvider
      .state('chart', {
        url: '/chart',
        component: 'chart',
        resolve: {
        	chartData: ChartService => ChartService.getChart()
        }
      });
    $urlRouterProvider.otherwise('/');
    
  })
  .factory('Store', () => {
    // hold a local copy of the state, setting its defaults
    const state = {
        data: {
          song: ''
        }
    };

    // expose basic getter and setter methods
    return {
      get() {
        return state.data;
      },
      set(data) {
        Object.assign( state.data, data );
      },
    };
  })
  .name
