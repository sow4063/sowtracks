import angular from 'angular'
import uiRouter from 'angular-ui-router';
import { UploadComponent } from './upload.component'
import { UploadService } from './upload.service';
import './upload.scss'

export const UploadModule = angular
  .module('upload', [
  	uiRouter
  ])
  .component('upload', UploadComponent)
  //.value('EventEmitter', song => ({$event: song}))
  .service('UploadService', UploadService)
  .config( ($stateProvider, $urlRouterProvider, $locationProvider) => {
    'ngInject';
    $stateProvider
      .state('files', {
        url: '/upload',
        component: 'upload',
        resolve: {
        	uploadData: UploadService => UploadService.postUpload()
        }
      });
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
  })
  .name
