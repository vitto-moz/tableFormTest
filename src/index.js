/* eslint-disable */
import angular from 'angular';

import 'angular-ui-router';
import routesConfig from './routes';
import './app/utility/сhecklist-model';
import {employeeFilter} from './app/filters/employeeFilter';

import {main} from './app/main/main';
import {header} from './app/header/header';
import {entryForm} from './app/entryForm/entryForm';
import {table} from './app/table/table';
import {footer} from './app/footer/footer';

import './index.scss';

angular.module('app', ['ui.router', 'checklist-model'])
  .config(routesConfig)
  .component('app', main)
  .component('fountainHeader', header)
  .component('fountainFooter', footer)
  .component('entryForm', entryForm)
  .component('table', table)
  .filter('employeeFilter', employeeFilter);
