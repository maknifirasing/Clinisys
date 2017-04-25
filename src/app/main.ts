import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {AppModule} from './app.module';
import * as HC from 'highcharts';
window['Highcharts'] = HC;
enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);
