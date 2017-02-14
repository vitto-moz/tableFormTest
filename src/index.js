import angular from 'angular';

// import {techsModule} from './app/techs/index';
import 'angular-ui-router';
import routesConfig from './routes';
import './сhecklist-model';
import {employeeFilter} from './app/employeeFilter';

import {main} from './app/main';
import {header} from './app/header';
import {entryForm} from './app/entryForm';
import {table} from './app/table';
import {footer} from './app/footer';

import './index.scss';

angular.module('app', ['ui.router', 'checklist-model'])
  .config(routesConfig)
  .component('app', main)
  .component('fountainHeader', header)
  .component('fountainFooter', footer)
  .component('entryForm', entryForm)
  .component('table', table)
  .filter('employeeFilter', employeeFilter);
