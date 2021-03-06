import {NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {SQLite} from '@ionic-native/sqlite';
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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from "@angular/flex-layout";
import {SigneCourbePage} from "../pages/signe-courbe/signe-courbe";
import {ClientDetailPage} from "../pages/client-detail/client-detail";
import {TraitmentCourbe} from "../pages/traitment-courbe/traitment-courbe";
import {ConsignePage} from "../pages/consigne/consigne";
import {ModifPassPage} from "../pages/modif-pass/modif-pass";
import {CustomIconsModule} from 'ionic2-custom-icons';
import {Ng2HighchartsModule} from 'ng2-highcharts';
import {Variables} from "../providers/variables";
import {HttpModule} from '@angular/http';
import {PharmaciePage} from "../pages/pharmacie/pharmacie";
import {RealisationPage} from "../pages/realisation/realisation";
import {ThemeableBrowser} from "@ionic-native/themeable-browser";
import {Transfer} from "@ionic-native/transfer";
import {File} from '@ionic-native/file';
import {Try} from "../pages/try/try";
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
    ClientDetailPage,
    TraitmentCourbe,
    ConsignePage,
    ModifPassPage,
    PharmaciePage,
    RealisationPage,
    Try
  ],
  imports: [
    BrowserModule,
    CustomIconsModule,
    Ng2HighchartsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    CustomIconsModule,
    Ng2HighchartsModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      platforms: {
        ios: {
          statusbarPadding: true,
          tabsHideOnSubPages: true
        }
      }
    })
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
    ClientDetailPage,
    TraitmentCourbe,
    ConsignePage,
    ModifPassPage,
    PharmaciePage,
    RealisationPage,
    Try
  ],
  providers: [
    SQLite,
    StatusBar,
    SplashScreen,
    Variables,
    ThemeableBrowser,
    File,
    Transfer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
