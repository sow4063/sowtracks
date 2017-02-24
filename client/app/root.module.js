import angular from 'angular'
import { rootComponent } from './root.component'
import './root.scss'

export const root = angular
  .module('root', [])
  .component('root', rootComponent)
