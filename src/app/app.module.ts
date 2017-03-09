import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {ListePage} from '../pages/liste/liste';
import {DossierPage} from '../pages/dossier/dossier';
import {DetailPerPagePage} from '../pages/detail-per-page/detail-per-page';
import {ExamenRadioPage} from "../pages/examen-radio/examen-radio";
import {ExamenLaboPage} from "../pages/examen-labo/examen-labo";
import {PdfViewerComponent} from 'ng2-pdf-viewer';
import {PdfViewPage} from '../pages/pdf-view/pdf-view';
import {ListPreanesthesiePage} from "../pages/list-preanesthesie/list-preanesthesie";
import {LanguesPage} from "../pages/langues/langues";
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    ListePage,
    DossierPage,
    DetailPerPagePage,
    ExamenRadioPage,
    ExamenLaboPage,
    PdfViewPage,
    PdfViewerComponent,
    ListPreanesthesiePage,
    LanguesPage

  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    ListePage,
    DossierPage,
    DetailPerPagePage,
    ExamenRadioPage,
    ExamenLaboPage,
    PdfViewPage,
    ListPreanesthesiePage,
    LanguesPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}
