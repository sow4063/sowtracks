import angular from 'angular'
import uiRouter from 'angular-ui-router';
import { DownloadComponent } from './download.component'
import { DownloadService } from './download.service';
import './download.scss'

export const DownloadModule = angular
  .module('download', [
  	uiRouter
  ])
  .component('download', DownloadComponent)
  .service('DownloadService', DownloadService)
  .config( ($stateProvider, $urlRouterProvider, $locationProvider) => {
    'ngInject';
    $stateProvider
      .state('downfiles', {
        url: '/download',
        component: 'download',
        resolve: {
        	downloadData: DownloadService => DownloadService.getDownload()
        }
      });
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
  })
  .name
