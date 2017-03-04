import angular from 'angular';
import uiRouter from 'angular-ui-router';
import { SearchModule } from './search/search.module';
import { UploadModule } from './upload/upload.module';
import { DownloadModule } from './download/download.module';

export const ComponentsModule = angular
  .module('components', [
  	SearchModule,
  	UploadModule,
  	DownloadModule
  ])
  .name


