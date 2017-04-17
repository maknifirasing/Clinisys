import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app.module';
import * as HC from 'highcharts';
window['Highcharts'] = HC;
platformBrowserDynamic().bootstrapModule(AppModule);
