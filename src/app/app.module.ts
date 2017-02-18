import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ListePage } from '../pages/liste/liste';
import { DossierPage } from '../pages/dossier/dossier';
import { DetailPerPagePage } from '../pages/detail-per-page/detail-per-page';
import {ExamenRadioPage} from "../pages/examen-radio/examen-radio";
import {ListPreanesthesiePage} from "../pages/list-preanesthesie/list-preanesthesie";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ListePage,
    DossierPage,
    DetailPerPagePage,
    ExamenRadioPage,
    ListPreanesthesiePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ListePage,
    DossierPage,
    DetailPerPagePage,
    ExamenRadioPage,
    ListPreanesthesiePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
