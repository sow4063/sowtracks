
/**
 *
 * @ngdoc module
 * @name common
 *
 * @requires ui.router
 * @requires angular-loading-bar
 *
 * @description
 *
 * This is the common module. It includes a run method that setups the loading bar.
 *
 **/
import angular from 'angular'
import uiRouter from 'angular-ui-router';
import loadingBar from 'angular-loading-bar';
import ngMaterial from 'angular-material';

export const CommonModule = angular
  .module('common', [
    uiRouter,
    ngMaterial,
    loadingBar
  ])
  .run(function ($transitions, cfpLoadingBar) {
    $transitions.onStart({}, cfpLoadingBar.start);
    $transitions.onSuccess({}, cfpLoadingBar.complete);
  })
  .name
