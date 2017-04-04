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
import {ListeCliniquePage} from "../pages/liste-clinique/liste-clinique";
import {MaterialModule} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SigneCourbePage} from "../pages/signe-courbe/signe-courbe";
import {NotificationPage} from "../pages/notification/notification";
import {ClientDetailPage} from "../pages/client-detail/client-detail";
import {TraitCourbe} from "../models/TraitCourbe";
import {TraitmentCourbe} from "../pages/traitment-courbe/traitment-courbe";

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
    LanguesPage,
    ListeCliniquePage,
    SigneCourbePage,
    NotificationPage,
    ClientDetailPage,
    TraitmentCourbe
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    FlexLayoutModule,
    MaterialModule
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
    LanguesPage,
    ListeCliniquePage,
    SigneCourbePage,
    NotificationPage,
    ClientDetailPage,
    TraitmentCourbe
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}
