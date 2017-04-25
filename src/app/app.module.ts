import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';

import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ListePage} from '../pages/liste/liste';
import {DossierPage} from '../pages/dossier/dossier';
import {ExamenRadioPage} from "../pages/examen-radio/examen-radio";
import {ExamenLaboPage} from "../pages/examen-labo/examen-labo";
import {PdfViewerComponent} from 'ng2-pdf-viewer';
import {PdfViewPage} from '../pages/pdf-view/pdf-view';
import {ListPreanesthesiePage} from "../pages/list-preanesthesie/list-preanesthesie";
import {LanguesPage} from "../pages/langues/langues";
import {ListeCliniquePage} from "../pages/liste-clinique/liste-clinique";
import {MaterialModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from "@angular/flex-layout";
import {SigneCourbePage} from "../pages/signe-courbe/signe-courbe";
import {ClientDetailPage} from "../pages/client-detail/client-detail";
<<<<<<< HEAD
import {TryPage} from "../pages/try/try";
import {ConsignePage} from "../pages/consigne/consigne";

=======
import {TraitmentCourbe} from "../pages/traitment-courbe/traitment-courbe";
import {ConsignePage} from "../pages/consigne/consigne";
import {ModifPassPage} from "../pages/modif-pass/modif-pass";
import {CustomIconsModule} from 'ionic2-custom-icons';
import {TryPage} from "../pages/try/try";
import {Ng2HighchartsModule} from 'ng2-highcharts';
import {RealisationPage} from "../pages/realisation/realisation";
import {Variables} from "../providers/variables";
import {HttpModule} from '@angular/http';
import {MenuPage} from "../pages/menu/menu";
>>>>>>> 9c5f10abfd96f15679a024fa49f5abcf1d64585e

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    ListePage,
    DossierPage,
    ExamenRadioPage,
    ExamenLaboPage,
    PdfViewPage,
    PdfViewerComponent,
    ListPreanesthesiePage,
    LanguesPage,
    ListeCliniquePage,
    SigneCourbePage,
<<<<<<< HEAD
    NotificationPage,
    ClientDetailPage,
    TryPage,
    ConsignePage

=======
    ClientDetailPage,
    TraitmentCourbe,
    ConsignePage,
    ModifPassPage,
    RealisationPage,
    MenuPage,
    TryPage
>>>>>>> 9c5f10abfd96f15679a024fa49f5abcf1d64585e
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
<<<<<<< HEAD
    MaterialModule
=======
    CustomIconsModule,
    Ng2HighchartsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    CustomIconsModule,
    Ng2HighchartsModule,
    MaterialModule.forRoot(),
    HttpModule,
    IonicModule.forRoot(MyApp)
>>>>>>> 9c5f10abfd96f15679a024fa49f5abcf1d64585e
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    ListePage,
    DossierPage,
    ExamenRadioPage,
    ExamenLaboPage,
    PdfViewPage,
    PdfViewerComponent,
    ListPreanesthesiePage,
    LanguesPage,
    ListeCliniquePage,
    SigneCourbePage,
<<<<<<< HEAD
    NotificationPage,
    ClientDetailPage,
    TryPage,
    ConsignePage
=======
    ClientDetailPage,
    TraitmentCourbe,
    ConsignePage,
    ModifPassPage,
    RealisationPage,
    MenuPage,
    TryPage
>>>>>>> 9c5f10abfd96f15679a024fa49f5abcf1d64585e
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    Variables,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
