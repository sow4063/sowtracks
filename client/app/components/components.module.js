import angular from 'angular';
import { SearchModule } from './search/search.module';
import { UploadModule } from './upload/upload.module';
import { DownloadModule } from './download/download.module';
import { ChartModule } from './chart/chart.module';

export const ComponentsModule = angular
  .module('components', [
  	SearchModule,
  	UploadModule,
  	DownloadModule,
  	ChartModule
  ])
  .name


